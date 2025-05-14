import { Button, Input, VStack, Dialog, CloseButton, Field, NativeSelect } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useCreateAuditLog, useCreateCustomer } from '../api';
import { ActionType, Customer, UserType } from '../api/models';
import { toaster } from './Toaster';
import { useState } from 'react';

interface AddCustomerModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddCustomerModal = ({ open, onClose }: AddCustomerModalProps) => {
  const [addedBy, setAddedBy] = useState(UserType.FRONT_OFFICE_AGENT);

  const { mutateAsync, isPending } = useCreateCustomer({
    onSuccess: () => {
      toaster.success({ title: 'Customer added' });

      onClose();
    },
    onError: () => {
      toaster.error({ title: 'Something went wrong' });
    },
  });

  const { mutateAsync: logAudit } = useCreateAuditLog({});

  const handleAddCustomer = async (newCustomer: Customer) => {
    try {
      await mutateAsync(newCustomer);

      await logAudit({
        action: `New Customer added`,
        timestamp: new Date().toISOString(),
        actionType: ActionType.CREATE_CUSTOMER,
        user: addedBy,
      });
    } catch (error) {
      console.error('Caught mutation error:', error);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onClose}
      motionPreset='slide-in-bottom'
      initialFocusEl={() => null}
    >
      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Add New Customer</Dialog.Title>
          </Dialog.Header>

          <Formik
            initialValues={{
              Name: '',
              Surname: '',
              BirthDate: '',
              GSMNumber: '',
            }}
            onSubmit={values => {
              const newCustomer = {
                ...values,
                CustomerID: String(Date.now()),
                CardNumber: undefined,
              };
              handleAddCustomer(newCustomer);
            }}
          >
            {({ handleChange }) => (
              <Form>
                <Dialog.Body>
                  <VStack gap='4'>
                    <Field.Root>
                      <Field.Label>Name</Field.Label>
                      <Input
                        name='Name'
                        placeholder='Enter name'
                        onChange={handleChange}
                        required
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Name</Field.Label>
                      <Input
                        name='Surname'
                        placeholder='Enter surname'
                        onChange={handleChange}
                        required
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Birth date</Field.Label>
                      <Input name='BirthDate' type='date' onChange={handleChange} required />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Mobile number</Field.Label>
                      <Input
                        name='GSMNumber'
                        placeholder='+994XXXXXXXXX'
                        onChange={handleChange}
                        required
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Added by</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          value={addedBy}
                          onChange={e => setAddedBy(e.target.value as UserType)}
                        >
                          <option value={UserType.FRONT_OFFICE_AGENT}>Front office Agent</option>
                          <option value={UserType.CALL_CENTER_AGENT}>Call center Agent</option>
                          <option value={UserType.ADMIN}>Admin</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>
                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant='subtle' colorPalette='red'>
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>

                  <Button type='submit' colorPalette='green' loading={isPending}>
                    Save
                  </Button>
                </Dialog.Footer>
              </Form>
            )}
          </Formik>

          <Dialog.CloseTrigger>
            <CloseButton size='sm' />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
