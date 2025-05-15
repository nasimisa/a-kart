import { Field, NativeSelect } from '@chakra-ui/react';

interface IProps {
  label: string;
  value: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export const SelectField = ({ label, value, onChange, options, placeholder }: IProps) => {
  return (
    <Field.Root>
      {/* @ts-ignore */}
      <Field.Label fontWeight={500} color='#5e5858'>
        {label}
      </Field.Label>

      <NativeSelect.Root>
        <NativeSelect.Field value={value} onChange={onChange} placeholder={placeholder}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
};
