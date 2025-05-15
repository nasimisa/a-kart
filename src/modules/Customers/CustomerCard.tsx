import { useState } from 'react';
import { Box, Text, IconButton, Flex, useDisclosure, Button, HStack } from '@chakra-ui/react';
import { FiEye, FiEyeOff, FiTrash2, FiPlus } from 'react-icons/fi';
import { ActionType, Customer, UserType } from '../../api/models';
import { useCreateAuditLog, useEditCustomer } from '../../api';
import { Copy, toaster } from '../../components';
import { formatDate } from '../../utilities';
import { CardRemovalModal } from './CardRemovalModal';

interface IProps {
  customer: Customer;
}

export const CustomerCard = ({ customer }: IProps) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [showPan, setShowPan] = useState(false);

  const { mutateAsync, isPending } = useEditCustomer({
    onError: () => {
      toaster.error({ title: 'Something went wrong' });
    },
  });

  const { mutateAsync: logAudit } = useCreateAuditLog({});

  const handleAddCard = async () => {
    const newCard = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
    try {
      await mutateAsync({ ...customer, CardNumber: newCard });
      toaster.success({ title: 'Card added successfully' });

      await logAudit({
        action: `Card added for Customer ID: ${customer.CustomerID}`,
        timestamp: new Date().toISOString(),
        actionType: ActionType.ADD_CARD,
        user: UserType.ADMIN,
      });
    } catch (error) {
      console.error('Caught mutation error:', error);
    }
  };

  const card = customer.CardNumber ? customer.CardNumber.replace(/(.{4})/g, '$1 ').trim() : '';
  const maskedCard = customer.CardNumber
    ? `${customer.CardNumber.slice(0, 4)} **** **** ${customer.CardNumber.slice(-4)}`
    : '';

  return (
    <>
      <Box borderWidth='1px' p='4' borderRadius='lg' boxShadow='md' bg='white' maxW={400}>
        <HStack justifyContent='space-between'>
          <Text fontWeight='bold'>
            {customer.Name} {customer.Surname}
          </Text>

          <HStack
            bg='purple.100'
            color='purple.800'
            fontSize='2xs'
            fontWeight='bold'
            px='2'
            py='1'
            borderRadius='md'
            boxShadow='sm'
            w='fit-content'
          >
            ID: {customer.CustomerID}
            <Copy ml={2} text={customer.CustomerID} />
          </HStack>
        </HStack>

        <Text>Birth date: {formatDate(customer?.BirthDate)}</Text>
        <Text mb={8}>Mobile number: {customer.GSMNumber}</Text>

        {customer.CardNumber ? (
          <Flex align='center'>
            <Text fontFamily='monospace' fontSize='md'>
              {showPan ? card : maskedCard}
            </Text>
            <IconButton
              ml='2'
              size='xs'
              aria-label='Toggle PAN'
              onClick={() => setShowPan(!showPan)}
              color='#fff'
              bg='#9086FF'
            >
              {showPan ? <FiEyeOff /> : <FiEye />}
            </IconButton>
            <IconButton
              ml='2'
              size='xs'
              colorPalette='red'
              aria-label='Remove card'
              onClick={onOpen}
            >
              <FiTrash2 />
            </IconButton>
          </Flex>
        ) : (
          <Button
            onClick={handleAddCard}
            colorPalette='green'
            maxH='32px'
            w='121.62px'
            loading={isPending}
          >
            <FiPlus size={12} />
            Add Card
          </Button>
        )}
      </Box>

      <CardRemovalModal open={open} onClose={onClose} customer={customer} />
    </>
  );
};
