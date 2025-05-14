import { useCallbackRef } from '@chakra-ui/react';
import { useState } from 'react';

export interface UseCopyToClipboardProps {
  timeout?: number;
  onCopiedOut?: () => void;
}

const useCopyToClipboard = ({ timeout = 600, onCopiedOut }: UseCopyToClipboardProps = {}): [
  boolean,
  (data: string) => void
] => {
  const [copied, setCopied] = useState(false);
  const onCopiedOutProp = useCallbackRef(onCopiedOut);
  const copyHandler = (timeout: number, onCopiedOut: () => void) => (data: string) => {
    void navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onCopiedOut();
    }, timeout);
  };

  const handleCopy = useCallbackRef(copyHandler(timeout, onCopiedOutProp));

  return [copied, handleCopy];
};

export default useCopyToClipboard;
