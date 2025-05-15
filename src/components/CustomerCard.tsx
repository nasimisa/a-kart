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
  NativeSelect,
  Field,
  HStack,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff, FiTrash2, FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import { ActionType, Customer, UserType } from '../api/models';
import { useCreateAuditLog, useEditCustomer } from '../api';
import { toaster } from './Toaster';
import Copy from './Copy';

interface CustomerCardProps {
  customer: Customer;
}

export const CustomerCard = ({ customer }: CustomerCardProps) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [showPan, setShowPan] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [deletedBy, setDeletedBy] = useState(UserType.FRONT_OFFICE_AGENT);
  const { mutateAsync, isPending } = useEditCustomer({
    onSuccess: () => {
      onClose();
    },
    onError: () => {
      toaster.error({ title: 'Something went wrong' });
    },
  });

  const { mutateAsync: logAudit } = useCreateAuditLog({});

  const handleRemoveCard = async () => {
    try {
      await mutateAsync({ ...customer, CardNumber: undefined });
      toaster.success({ title: 'Card removed successfully' });

      await logAudit({
        action: `Card removed from Customer ID: ${customer.CustomerID}`,
        reason: cancelReason,
        timestamp: new Date().toISOString(),
        actionType: ActionType.DELETE_CARD,
        user: deletedBy,
      });
    } catch (error) {
      console.error('Caught mutation error:', error);
    }
  };

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

  const handleClose = () => {
    onClose();
    setCancelReason('');
    setDeletedBy(UserType.FRONT_OFFICE_AGENT);
  };

  return (
    <Box
      position='relative'
      borderWidth='1px'
      p='4'
      borderRadius='lg'
      boxShadow='md'
      bg='white'
      maxW={400}
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
        ID: {customer.CustomerID}
        <Copy ml={2} text={customer.CustomerID} />
      </HStack>

      <Text fontWeight='bold'>
        {customer.Name} {customer.Surname}
      </Text>
      <Text>Birth date: {customer.BirthDate}</Text>
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
          <IconButton ml='2' size='xs' colorPalette='red' aria-label='Remove card' onClick={onOpen}>
            <FiTrash2 />
          </IconButton>
        </Flex>
      ) : (
        <Button onClick={handleAddCard} colorPalette='green' maxH='32px'>
          <FiPlus size={12} />
          Add Card
        </Button>
      )}

      {/* Cancellation Reason Modal */}
      <Dialog.Root
        open={open}
        onOpenChange={handleClose}
        motionPreset='slide-in-bottom'
        initialFocusEl={() => null}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Remove Card</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Field.Root>
                  {/* @ts-ignore */}
                  <Field.Label fontWeight={500} color='#5e5858'>
                    Deleted by
                  </Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      value={deletedBy}
                      onChange={e => setDeletedBy(e.target.value as UserType)}
                    >
                      <option value={UserType.FRONT_OFFICE_AGENT}>Front office Agent</option>
                      <option value={UserType.CALL_CENTER_AGENT}>Call center Agent</option>
                      <option value={UserType.ADMIN}>Admin</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>

                <Field.Root css={{ mt: 4 }} required>
                  {/* @ts-ignore */}
                  <Field.Label fontWeight={500} color='#5e5858'>
                    Removal reason
                  </Field.Label>
                  <Textarea
                    placeholder='Enter removal reason'
                    value={cancelReason}
                    onChange={e => setCancelReason(e.target.value)}
                    rows={2}
                    resize='none'
                    maxLength={100}
                  />
                </Field.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant='subtle' colorPalette='red'>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette='green'
                  onClick={handleRemoveCard}
                  disabled={!cancelReason?.trim()}
                  loading={isPending}
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
