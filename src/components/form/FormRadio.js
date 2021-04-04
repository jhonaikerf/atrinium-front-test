import { FormControl, FormLabel, FormErrorMessage, RadioGroup, Stack } from '@chakra-ui/react';

export default function FormRadio({ error, label, defaultValue, children }) {
  return (
    <FormControl isInvalid={!!error} errortext={error} px="4" pb="4" isRequired as="fieldset">
      <FormLabel>{label}</FormLabel>
      <RadioGroup defaultValue={defaultValue}>
        <Stack direction="row">{children}</Stack>
        <FormErrorMessage>{error}</FormErrorMessage>
      </RadioGroup>
    </FormControl>
  );
}
