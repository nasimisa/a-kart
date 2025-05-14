import {
  Box,
  Button,
  Heading,
  Input,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useGetCustomers } from '../api';
import { AddCustomerModal, CustomerCard } from '../components';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';

const Customers = () => {
  const { data: customers, isLoading } = useGetCustomers();
  const { open, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');

  const filtered = customers?.filter(cust => {
    const full = `${cust.Name} ${cust.Surname} ${cust.GSMNumber} ${cust.CardNumber}`.toLowerCase();
    return full.includes(search.toLowerCase());
  });

  return (
    <Box p='6'>
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
        <Button colorScheme='blue' onClick={onOpen} maxW={200}>
          <FiPlus />
          Add Customer
        </Button>
      </Stack>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {filtered?.reverse()?.map(customer => (
            <CustomerCard key={customer.CustomerID} customer={customer} />
          ))}
        </SimpleGrid>
      )}

      <AddCustomerModal open={open} onClose={onClose} />
    </Box>
  );
};

export default Customers;
