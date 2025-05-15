import { Dialog, CloseButton } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface IProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  mainAction?: ReactNode;
  secondaryAction?: ReactNode;
}

export const Modal = ({ open, onClose, title, children, mainAction, secondaryAction }: IProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={onClose}
      motionPreset='slide-in-bottom'
      scrollBehavior='inside'
      initialFocusEl={() => null}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>{children}</Dialog.Body>

          {mainAction && secondaryAction && (
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>{secondaryAction}</Dialog.ActionTrigger>
              {mainAction}
            </Dialog.Footer>
          )}

          <Dialog.CloseTrigger>
            <CloseButton size='sm' />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
