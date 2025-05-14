import { Button, Heading, Input, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';
import { useGetCustomers } from '../api';
import { CustomerCard } from '../components';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';

export const CustomersList = ({ onOpen }: { onOpen: () => void }) => {
  const { data: customers, isLoading } = useGetCustomers();
  const [search, setSearch] = useState('');

  const filtered = customers?.filter(item => {
    const full =
      `${item.Name} ${item.Surname} ${item.GSMNumber} ${item.CardNumber} ${item.CustomerID}`.toLowerCase();
    return full.includes(search.toLowerCase());
  });

  return (
    <>
      <Heading size='3xl' mb={4}>
        Customers
      </Heading>
      <Spacer />
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        mb={4}
        justifyContent='space-between'
      >
        <Input
          maxW='300px'
          placeholder='Search by name, mobile or card number'
          value={search}
          onChange={e => setSearch(e.target.value)}
          mr='4'
        />
        <Button color='#fff' bg='#F57430' onClick={onOpen} maxW={200}>
          <FiPlus />
          Add Customer
        </Button>
      </Stack>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
          {filtered?.reverse()?.map(customer => (
            <CustomerCard key={customer.CustomerID} customer={customer} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
