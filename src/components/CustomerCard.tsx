import {
  Box,
  Text,
  IconButton,
  Flex,
  useDisclosure,
  Button,
  Dialog,
  Portal,
  CloseButton,
  Textarea,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff, FiTrash2, FiPlus } from 'react-icons/fi';
import { useState } from 'react';
// import { updateCustomer } from '@/api/customers';
// import { logAudit } from '@/api/audit';
import { Customer } from '../api/models';

interface CustomerCardProps {
  customer: Customer;
}

export const CustomerCard = ({ customer }: CustomerCardProps) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [showPan, setShowPan] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const handleRemoveCard = () => {
    // updateMutation.mutate({ ...customer, CardNumber: undefined });
    // logAudit({
    //   action: `Card removed from Customer ${customer.CustomerID}. Reason: ${cancelReason}`,
    //   timestamp: new Date().toISOString(),
    // });
    onClose();
  };

  const handleAddCard = () => {
    const newCard = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
    // mutateAsync({ ...customer, CardNumber: newCard });
    // logAudit({
    //   action: `Card added to Customer ${customer.CustomerID}`,
    //   timestamp: new Date().toISOString(),
    // });
  };

  const card = customer.CardNumber ? customer.CardNumber.replace(/(.{4})/g, '$1 ').trim() : '';
  const maskedCard = customer.CardNumber
    ? `${customer.CardNumber.slice(0, 4)} **** **** ${customer.CardNumber.slice(-4)}`
    : '';

  return (
    <Box borderWidth='1px' p='4' borderRadius='lg' boxShadow='md' bg='white' maxW={400}>
      <Text fontWeight='bold'>
        {customer.Name} {customer.Surname}
      </Text>
      <Text>Birth date: {customer.BirthDate}</Text>
      <Text mb={8}>Mobile number: {customer.GSMNumber}</Text>

      {customer.CardNumber ? (
        <>
          <Flex mt='2' align='center'>
            <Text fontFamily='monospace' fontSize='lg'>
              {showPan ? card : maskedCard}
            </Text>
            <IconButton
              ml='2'
              size='sm'
              aria-label='Toggle PAN'
              onClick={() => setShowPan(!showPan)}
            >
              {showPan ? <FiEyeOff /> : <FiEye />}
            </IconButton>
            <IconButton
              ml='2'
              size='sm'
              colorScheme='red'
              aria-label='Remove card'
              onClick={onOpen}
            >
              <FiTrash2 />
            </IconButton>
          </Flex>
        </>
      ) : (
        <Button mt='4' onClick={handleAddCard}>
          <FiPlus />
          Add Card
        </Button>
      )}

      {/* Cancellation Reason Modal */}
      <Dialog.Root open={open} onOpenChange={onClose} motionPreset='slide-in-bottom'>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Remove Card</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Textarea
                  placeholder='Removal reason'
                  value={cancelReason}
                  onChange={e => setCancelReason(e.target.value)}
                  rows={4}
                  resize='none'
                />
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant='outline'>Cancel</Button>
                </Dialog.ActionTrigger>
                <Button
                  colorScheme='red'
                  onClick={handleRemoveCard}
                  disabled={!cancelReason?.trim()}
                >
                  Confirm
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger>
                <CloseButton size='sm' />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};
