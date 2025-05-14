import { FC, MouseEvent, PropsWithChildren } from 'react';
import {
  StackProps,
  IconButton,
  HStack,
  Box,
  ButtonProps,
  IconButtonProps,
} from '@chakra-ui/react';
import { FiCopy } from 'react-icons/fi';
import { Tooltip } from './Tooltip';
import useCopyToClipboard from '../utilities/useCopyToClipboard';

export type IProps = {
  text?: string;
  timeout?: number;
  size?: IconButtonProps['size'];
  iconColor?: string;
  buttonText?: string;
  stopPropagation?: boolean;
  buttonProps?: ButtonProps;
  copyOnClick?: boolean;
  onCopiedOut?: () => void;
};

const Copy: FC<PropsWithChildren<IProps & StackProps>> = ({
  text,
  children,
  timeout = 600,
  size = 'xs',
  iconColor = 'black',
  buttonText,
  stopPropagation = false,
  buttonProps = {},
  copyOnClick = false,
  onCopiedOut,
  ...props
}) => {
  const [isCopied, copy] = useCopyToClipboard({ timeout, onCopiedOut });

  const onCopy = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (stopPropagation) e.stopPropagation();

    if (!text) return;

    copy(text);
  };

  return (
    <HStack
      gap={2}
      align='center'
      {...(copyOnClick ? { cursor: 'pointer', onClick: onCopy } : {})}
      {...props}
    >
      {children && <Box>{children}</Box>}
      <Tooltip content='Copied' open={isCopied} positioning={{ placement: 'top' }} showArrow>
        <IconButton
          aria-label='copy'
          variant='plain'
          border='none'
          padding={0}
          height='auto'
          width='auto'
          minW='initial'
          size={size}
          onClick={!copyOnClick ? onCopy : undefined}
          {...buttonProps}
        >
          <FiCopy color={iconColor} />
        </IconButton>
      </Tooltip>
    </HStack>
  );
};

export default Copy;
