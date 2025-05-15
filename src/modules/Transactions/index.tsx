import { Box, Heading, VStack } from '@chakra-ui/react';
import { useGetTransactions } from '../../api';
import { formatDate, useSearchAndFilter } from '../../utilities';
import { Search, Table } from '../../components';
import { Transaction } from '../../api/models';
import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  headerColor?: string;
}

export const TransactionsTable = () => {
  const { data: transactions, isLoading } = useGetTransactions();

  const { search, setSearch, filteredData } = useSearchAndFilter<Transaction>(transactions, [
    'TransactionID',
    'CustomerID',
  ]);

  const columns: Column<Transaction>[] = [
    { header: 'Transaction ID', accessor: 'TransactionID' },
    { header: 'Customer ID', accessor: 'CustomerID' },
    {
      header: 'Transaction Date',
      accessor: (tx: Transaction) => formatDate(tx.TransactionDate),
    },
    {
      header: 'Amount',
      accessor: (tx: Transaction) => `$${Number(tx.TransactionAmount).toFixed(2)}`,
    },
  ];
  return (
    <Box p='6'>
      <Heading size='3xl' mb={4}>
        Transactions
      </Heading>
      <VStack gap={4} alignItems='normal'>
        <Search
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          placeholder='Search by customer ID or transaction ID'
        />

        <Table
          columns={columns}
          data={filteredData || []}
          isLoading={isLoading}
          maxWidth={1200}
          maxHeight='79vh'
          skeletonRowCount={50}
          showColumnBorder
          stickyHeader
          headerBg='#9086FF'
        />
      </VStack>
    </Box>
  );
};
