import { Button, Input, VStack, Dialog, CloseButton } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useCreateCustomer } from '../api';
import { Customer } from '../api/models';
import { toaster } from './Toaster';
// import { logAudit } from '@/api/audit';

interface AddCustomerModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddCustomerModal = ({ open, onClose }: AddCustomerModalProps) => {
  const { mutateAsync, isPending } = useCreateCustomer({
    onSuccess: () => {
      toaster.success({ title: 'Customer added' });

      onClose();
    },
    onError: () => {
      toaster.error({ title: 'Something went wrong' });
    },
  });

  const handleAddCustomer = async (newCustomer: Customer) => {
    try {
      await mutateAsync(newCustomer);
    } catch (error) {
      console.error('Caught mutation error:', error);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose} motionPreset='slide-in-bottom'>
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
              // logAudit({
              //   action: `Customer ${values.Name} ${values.Surname} created.`,
              //   timestamp: new Date().toISOString(),
              // });
            }}
          >
            {({ handleChange }) => (
              <Form>
                <Dialog.Body>
                  <VStack gap='4'>
                    <Input name='Name' placeholder='Name' onChange={handleChange} required />
                    <Input name='Surname' placeholder='Surname' onChange={handleChange} required />
                    <Input name='BirthDate' type='date' onChange={handleChange} required />
                    <Input
                      name='GSMNumber'
                      placeholder='+994XXXXXXXXX'
                      onChange={handleChange}
                      required
                    />
                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant='outline'>Cancel</Button>
                  </Dialog.ActionTrigger>

                  <Button type='submit' colorScheme='blue' loading={isPending}>
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
