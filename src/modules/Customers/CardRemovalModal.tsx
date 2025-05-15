import { useState } from 'react';
import { Button, VStack } from '@chakra-ui/react';
import { ActionType, Customer, UserType } from '../../api/models';
import { useCreateAuditLog, useEditCustomer } from '../../api';
import { InputField, Modal, SelectField, toaster } from '../../components';
import { userTypeOptions } from './data';

interface IProps {
  open: boolean;
  onClose: () => void;
  customer: Customer;
}

export const CardRemovalModal = ({ open, onClose, customer }: IProps) => {
  const [cancelReason, setCancelReason] = useState('');
  const [deletedBy, setDeletedBy] = useState(UserType.FRONT_OFFICE_AGENT);

  const handleClose = () => {
    onClose();
    setCancelReason('');
    setDeletedBy(UserType.FRONT_OFFICE_AGENT);
  };

  const { mutateAsync, isPending } = useEditCustomer({
    onSuccess: () => {
      handleClose();
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title='Remove Card'
      secondaryAction={
        <Button variant='subtle' colorPalette='red'>
          Cancel
        </Button>
      }
      mainAction={
        <Button
          colorPalette='green'
          onClick={handleRemoveCard}
          disabled={!cancelReason?.trim()}
          loading={isPending}
        >
          Confirm
        </Button>
      }
    >
      <VStack gap='4'>
        <SelectField
          label='Deleted by'
          value={deletedBy}
          onChange={e => setDeletedBy(e.target.value as UserType)}
          options={userTypeOptions}
        />

        <InputField
          name='RemovalReason'
          label='Removal reason'
          value={cancelReason}
          placeholder='Enter removal reason'
          isTextArea
          textAreaProps={{
            rows: 2,
            resize: 'none',
            maxLength: 100,
            onChange: e => setCancelReason(e.target.value),
          }}
        />
      </VStack>
    </Modal>
  );
};
