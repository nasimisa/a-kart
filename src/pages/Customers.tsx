import { Box, useDisclosure } from '@chakra-ui/react';
import { AddCustomerModal, CustomersList } from '../modules';

const Customers = () => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box p='6'>
      <CustomersList onOpen={onOpen} />
      <AddCustomerModal open={open} onClose={onClose} />
    </Box>
  );
};

export default Customers;
