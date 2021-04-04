import { FormControl, FormLabel, FormErrorMessage, Select } from '@chakra-ui/react';

export default function FormSelect({ register, error, label, placeholder, name, children }) {
  return (
    <FormControl isInvalid={!!error} errortext={error} px="4" pb="4" isRequired id={name}>
      <FormLabel>{label}</FormLabel>
      <Select placeholder={placeholder} {...register(name)}>
        {children}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
