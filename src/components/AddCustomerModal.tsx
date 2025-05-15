import { Button, Input, VStack, Dialog, CloseButton, Field, NativeSelect } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useCreateAuditLog, useCreateCustomer } from '../api';
import { ActionType, Customer, UserType } from '../api/models';
import { toaster } from './Toaster';
import { useState } from 'react';
import { object, string } from 'yup';
import { parse, isValid, format } from 'date-fns';

const validationSchema = object({
  Name: string().required('Name is required').max(10, 'Name cannot exceed 10 characters'),
  Surname: string().required('Surname is required').max(10, 'Surname cannot exceed 10 characters'),
  BirthDate: string()
    .required('Birth date is required')
    .test('is-valid-date', 'Invalid date format', value => {
      if (!value) return false;
      const parsed = parse(value, 'yyyy-MM-dd', new Date());
      return isValid(parsed) && format(parsed, 'yyyy-MM-dd') === value;
    }),
  GSMNumber: string()
    .matches(/^\+994\d{9}$/, 'Must be a valid Azerbaijani number')
    .required('Mobile number is required'),
});

interface AddCustomerModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddCustomerModal = ({ open, onClose }: AddCustomerModalProps) => {
  const [addedBy, setAddedBy] = useState(UserType.FRONT_OFFICE_AGENT);

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

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    isValid,
    resetForm,
    dirty,
  } = useFormik({
    initialValues: {
      Name: '',
      Surname: '',
      BirthDate: '',
      GSMNumber: '',
    },
    validationSchema,
    onSubmit: values => {
      const newCustomer: Customer = {
        ...values,
        CustomerID: String(Date.now()),
        CardNumber: undefined,
      };
      handleAddCustomer(newCustomer);
    },
  });

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const { mutateAsync, isPending } = useCreateCustomer({
    onSuccess: () => {
      toaster.success({ title: 'Customer added' });
      handleClose();
    },
    onError: () => {
      toaster.error({ title: 'Something went wrong' });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Dialog.Root
        open={open}
        onOpenChange={handleClose}
        motionPreset='slide-in-bottom'
        initialFocusEl={() => null}
        scrollBehavior='inside'
      >
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add New Customer</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <VStack gap='4'>
                <Field.Root invalid={touched.Name && errors.Name}>
                  {/* @ts-ignore */}
                  <Field.Label fontWeight={500} color='#5e5858'>
                    Name
                  </Field.Label>
                  <Input
                    name='Name'
                    placeholder='Enter name'
                    value={values.Name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Name && errors.Name && <Field.ErrorText>{errors.Name}</Field.ErrorText>}
                </Field.Root>

                <Field.Root invalid={touched.Surname && errors.Surname}>
                  {/* @ts-ignore */}
                  <Field.Label fontWeight={500} color='#5e5858'>
                    Surname
                  </Field.Label>
                  <Input
                    name='Surname'
                    placeholder='Enter surname'
                    value={values.Surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Surname && errors.Surname && (
                    <Field.ErrorText>{errors.Surname}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={touched.BirthDate && errors.BirthDate}>
                  {/* @ts-ignore */}
                  <Field.Label fontWeight={500} color='#5e5858'>
                    Birth date
                  </Field.Label>
                  <Input
                    name='BirthDate'
                    type='date'
                    value={values.BirthDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    mask='99/99/9999'
                  />
                  {touched.BirthDate && errors.BirthDate && (
                    <Field.ErrorText>{errors.BirthDate}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={touched.GSMNumber && errors.GSMNumber}>
                  {/* @ts-ignore */}
                  <Field.Label fontWeight={500} color='#5e5858'>
                    Mobile number
                  </Field.Label>
                  <Input
                    name='GSMNumber'
                    placeholder='+994XXXXXXXXX'
                    value={values.GSMNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.GSMNumber && errors.GSMNumber && (
                    <Field.ErrorText>{errors.GSMNumber}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root required>
                  {/* @ts-ignore */}
                  <Field.Label fontWeight={500} color='#5e5858'>
                    Added by
                  </Field.Label>
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

              <Button
                type='submit'
                colorPalette='green'
                loading={isPending}
                disabled={!dirty || !isValid}
              >
                Save
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger>
              <CloseButton size='sm' />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </form>
  );
};
