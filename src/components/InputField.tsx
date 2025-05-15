import { Field, Input, Textarea, TextareaProps } from '@chakra-ui/react';

interface IProps {
  name: string;
  label: string;
  value: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  mask?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  isTextArea?: boolean;
  textAreaProps?: TextareaProps;
}

export const InputField = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  isInvalid,
  errorMessage,
  mask,
  type = 'text',
  isTextArea,
  textAreaProps,
}: IProps) => {
  return (
    <Field.Root invalid={isInvalid}>
      {/* @ts-ignore */}
      <Field.Label fontWeight={500} color='#5e5858'>
        {label}
      </Field.Label>
      {isTextArea ? (
        <Textarea placeholder={placeholder} value={value} {...textAreaProps} />
      ) : (
        <Input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          {...(mask && { mask })}
        />
      )}

      {isInvalid && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  );
};
