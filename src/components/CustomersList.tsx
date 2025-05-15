import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';
import { useGetCustomers } from '../api';
import { CustomerCard, Empty } from '../components';
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
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        mb={4}
        justifyContent='space-between'
      >
        {isLoading ? (
          <Skeleton w='300px' height='40px' />
        ) : (
          <Input
            w='300px'
            placeholder='Search by name, mobile or card number'
            value={search}
            onChange={e => setSearch(e.target.value)}
            mr='4'
          />
        )}
        <Button color='#fff' bg='#F57430' onClick={onOpen} w={200} loading={isLoading}>
          <FiPlus />
          Add Customer
        </Button>
      </Stack>

      {!isLoading && !filtered?.length && <Empty />}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Box
                position='relative'
                borderWidth='1px'
                p='4'
                borderRadius='lg'
                boxShadow='md'
                bg='white'
                maxW={400}
                key={index}
              >
                <HStack
                  position='absolute'
                  top='2'
                  right='2'
                  bg='purple.100'
                  color='purple.800'
                  fontSize='xs'
                  fontWeight='bold'
                  px='2'
                  py='1'
                  borderRadius='md'
                  boxShadow='sm'
                >
                  <Skeleton w='70px' h='20px' bg='purple.100' />
                </HStack>

                <SkeletonText maxW={120} mb={1} />

                <Flex align='center' mt={8}>
                  <Skeleton w={{ base: '20vw', lg: '10vw' }} h='24px' />

                  <IconButton
                    ml='2'
                    size='xs'
                    aria-label='Toggle PAN'
                    color='#fff'
                    bg='#9086FF'
                    loading
                  />

                  <IconButton
                    ml='2'
                    size='xs'
                    colorPalette='red'
                    aria-label='Remove card'
                    loading
                  />
                </Flex>
              </Box>
            ))
          : filtered
              ?.reverse()
              ?.map(customer => <CustomerCard key={customer.CustomerID} customer={customer} />)}
      </SimpleGrid>
    </>
  );
};
