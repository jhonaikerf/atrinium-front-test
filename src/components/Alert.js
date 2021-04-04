import {
  Button,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

export default function Alert({ leastDestructiveRef, onClose, isOpen }) {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Exitoso
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>La informacion fue enviada.</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={leastDestructiveRef} onClick={onClose}>
            Ok
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
