import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';

export default function FormInput({ register, error, label, placeholder, name }) {
  return (
    <FormControl isInvalid={!!error} errortext={error} px="4" pb="4" isRequired>
      <FormLabel>{label}</FormLabel>
      <Input
        {...register(name)}
        type="text"
        placeholder={placeholder}
        name={name}
        id={name}
        key={name}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
