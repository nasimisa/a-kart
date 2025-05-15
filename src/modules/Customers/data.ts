import { object, string } from 'yup';
import { parse, isValid, format } from 'date-fns';
import { UserType } from '../../api/models';

export const validationSchema = object({
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

export const userTypeOptions = [
  { value: UserType.FRONT_OFFICE_AGENT, label: 'Front office Agent' },
  { value: UserType.CALL_CENTER_AGENT, label: 'Call center Agent' },
  { value: UserType.ADMIN, label: 'Admin' },
];
