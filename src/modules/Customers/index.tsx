import { Button, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useGetCustomers } from '../../api';
import { Empty, Search } from '../../components';
import { CustomerCard } from './CustomerCard';
import { useSearchAndFilter } from '../../utilities';
import { Customer } from '../../api/models';
import { CustomerCardSkeleton } from './CustomerCardSkeleton';

export const CustomersList = ({ onOpen }: { onOpen: () => void }) => {
  const { data: customers, isLoading } = useGetCustomers();

  const { search, setSearch, filteredData } = useSearchAndFilter<Customer>(customers, [
    'Name',
    'Surname',
    'GSMNumber',
    'CardNumber',
    'CustomerID',
  ]);

  return (
    <>
      <Heading size='3xl' mb={4}>
        Customers
      </Heading>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        mb={4}
        justifyContent='space-between'
      >
        <Search
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          placeholder='Search by name, mobile or card number'
        />

        <Button color='#fff' bg='#F57430' onClick={onOpen} w={200} loading={isLoading}>
          <FiPlus />
          Add Customer
        </Button>
      </Stack>

      {!isLoading && !filteredData?.length && <Empty />}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
        {isLoading ? (
          <CustomerCardSkeleton />
        ) : (
          filteredData
            ?.reverse()
            ?.map(customer => <CustomerCard key={customer.CustomerID} customer={customer} />)
        )}
      </SimpleGrid>
    </>
  );
};
