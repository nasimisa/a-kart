import { useState } from 'react';
import { Box, Heading, Input, Table, Skeleton } from '@chakra-ui/react';
import { useGetTransactions } from '../../api';
import { formatDate } from '../../utilities';
import { Empty } from '../../components';

export const TransactionsTable = () => {
  const { data: transactions, isLoading } = useGetTransactions();
  const [search, setSearch] = useState('');

  const filtered = transactions?.filter(item => {
    const full = `${item.CustomerID} ${item.TransactionID}`.toLowerCase();

    return full.includes(search.toLowerCase());
  });

  return (
    <Box p='6'>
      <Heading size='3xl' mb={4}>
        Transactions
      </Heading>
      <Box mb={4}>
        {isLoading ? (
          <Skeleton w='300px' height='40px' />
        ) : (
          <Input
            w='300px'
            placeholder='Search by customer ID or transaction ID'
            value={search}
            onChange={e => setSearch(e.target.value)}
            mr='4'
          />
        )}
      </Box>

      <Table.ScrollArea
        borderWidth='1px'
        maxW={{ base: '500px', md: 1200 }}
        maxH={{ base: '50vh', xl: '79vh' }}
        rounded='lg'
      >
        <Table.Root showColumnBorder stickyHeader interactive maxWidth={1200}>
          <Table.Header>
            <Table.Row bg='#9086FF'>
              <Table.ColumnHeader color='#fff'>Transaction ID</Table.ColumnHeader>
              <Table.ColumnHeader color='#fff'>Customer ID</Table.ColumnHeader>
              <Table.ColumnHeader color='#fff'>Transaction Date</Table.ColumnHeader>
              <Table.ColumnHeader color='#fff'>Amount</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading
              ? Array.from({ length: 50 }).map((_, index) => (
                  <Table.Row key={`skeleton-${index}`}>
                    {Array.from({ length: 4 }).map((_, cellIndex) => (
                      <Table.Cell key={`skeleton-cell-${index}-${cellIndex}`}>
                        <Skeleton height='20px' />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              : filtered?.map(tx => (
                  <Table.Row key={tx.TransactionID}>
                    <Table.Cell>{tx.TransactionID}</Table.Cell>
                    <Table.Cell>{tx.CustomerID}</Table.Cell>
                    <Table.Cell>{formatDate(tx?.TransactionDate)}</Table.Cell>
                    <Table.Cell fontVariantNumeric='initial'>
                      ${Number(tx.TransactionAmount).toFixed(2)}
                    </Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
        </Table.Root>

        {!isLoading && !filtered?.length && <Empty />}
      </Table.ScrollArea>
    </Box>
  );
};
