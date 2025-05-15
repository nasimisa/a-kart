import { useState } from 'react';
import { Button, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useCreateAuditLog, useCreateCustomer } from '../../api';
import { ActionType, Customer, UserType } from '../../api/models';
import { InputField, Modal, SelectField, toaster } from '../../components';
import { userTypeOptions, validationSchema } from './data';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const AddCustomerModal = ({ open, onClose }: IProps) => {
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
        CustomerID: String(Date.now())?.slice(-7),
        CardNumber: undefined,
      };
      handleAddCustomer(newCustomer);
    },
  });

  const handleClose = () => {
    onClose();
    resetForm();
    setAddedBy(UserType.FRONT_OFFICE_AGENT);
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
      <Modal
        open={open}
        onClose={handleClose}
        title='Add New Customer'
        secondaryAction={
          <Button variant='subtle' colorPalette='red'>
            Cancel
          </Button>
        }
        mainAction={
          <Button
            type='submit'
            colorPalette='green'
            loading={isPending}
            disabled={!dirty || !isValid}
          >
            Save
          </Button>
        }
      >
        <VStack gap='4'>
          <InputField
            name='Name'
            label='Name'
            value={values.Name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Enter name'
            isInvalid={!!(touched.Name && errors.Name)}
            errorMessage={errors.Name}
          />

          <InputField
            name='Surname'
            label='Surname'
            value={values.Surname}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Enter surname'
            isInvalid={!!(touched.Surname && errors.Surname)}
            errorMessage={errors.Surname}
          />

          <InputField
            name='BirthDate'
            label='Birth date'
            value={values.BirthDate}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!(touched.BirthDate && errors.BirthDate)}
            errorMessage={errors.BirthDate}
            mask='99/99/9999'
            type='date'
          />

          <InputField
            name='GSMNumber'
            label='GSMNumber'
            value={values.GSMNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='+994XXXXXXXXX'
            isInvalid={!!(touched.GSMNumber && errors.GSMNumber)}
            errorMessage={errors.GSMNumber}
          />

          <SelectField
            label='Added by'
            value={addedBy}
            onChange={e => setAddedBy(e.target.value as UserType)}
            options={userTypeOptions}
          />
        </VStack>
      </Modal>
    </form>
  );
};
