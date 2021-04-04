import { useState, useRef } from 'react';
import { Flex, Box, Center, Button, Radio } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import countries from '../src/data/countries.json';
import types from '../src/data/person-types.json';
import typeDocuments from '../src/data/document-types.json';
import schema from '../src/schema/form';
import FormInput from '../src/components/form/FormInput';
import FormSelect from '../src/components/form/FormSelect';
import FormRadio from '../src/components/form/FormRadio';
import Alert from '../src/components/Alert';

export default function LoginForm() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const okRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    setIsOpen(true);
    console.log(values);
  };

  const handleCountryChange = (event) => {
    if (event.target.value === 'ESP') {
      console.log(true);
    }
  };

  const country = watch('country');
  const type = watch('type', 'natural');

  return (
    <Flex justify="center" mh="100vh" w="100vw" align="center">
      <Center w="100%">
        <form style={{ width: 700 }}>
          <Flex pt="35">
            <Box w="50%">
              <FormSelect
                register={register}
                error={errors?.country?.message}
                label="Pais"
                name="country"
                placeholder="Selecciona el Pais"
              >
                {countries.map((item) => (
                  <option key={`country-${item.iso}`} value={item.iso}>
                    {item.name}
                  </option>
                ))}
              </FormSelect>
              <FormInput
                register={register}
                error={errors?.address?.message}
                label="Direccion"
                name="address"
                placeholder="Direccion"
              />
              <FormInput
                register={register}
                error={errors?.address2?.message}
                label="Provincia o Estado"
                name="address2"
                placeholder="Provincia o estado"
              />
              <FormInput
                register={register}
                error={errors?.state?.message}
                label="Provincia o Estado"
                name="state"
                placeholder="Provincia o estado"
              />
              <FormInput
                register={register}
                error={errors?.city?.message}
                label="Municipio o Ciudad"
                name="city"
                placeholder="Municipio o ciudad"
              />
              <FormInput
                register={register}
                error={errors?.zip?.message}
                label="Codigo Postal"
                name="zip"
                placeholder="Codigo postal"
              />
            </Box>
            <Box w="50%">
              <FormRadio
                error={errors?.type?.message}
                label="Tipo de Persona"
                defaultValue="natural"
              >
                {types.map((item) => (
                  <Radio key={`type-${item.value}`} value={item.value} {...register('type')}>
                    {item.name}
                  </Radio>
                ))}
              </FormRadio>
              {type === 'natural' ? (
                <>
                  <FormInput
                    register={register}
                    error={errors?.name?.message}
                    label="Nombre"
                    name="name"
                    placeholder="Nombre"
                  />
                  <FormInput
                    register={register}
                    error={errors?.surnames?.message}
                    label="Apellidos"
                    name="surnames"
                    placeholder="Apellidos"
                  />
                </>
              ) : (
                <FormInput
                  register={register}
                  error={errors?.company?.message}
                  label="Nombre de la Sociedad"
                  name="company"
                  placeholder="Nombre de la sociedad"
                />
              )}
              <FormSelect
                register={register}
                error={errors?.typeDocument?.message}
                label="Tipo de Documento"
                name="typeDocument"
                placeholder="Selecciona el tipo de documento"
              >
                {typeDocuments.map((item) => {
                  let show = false;
                  if (country === 'ESP') {
                    show = item[type];
                  } else {
                    show = !item.spain;
                  }
                  return show ? (
                    <option value={item.value} key={`typeDocument-${item.value}`}>
                      {item.name}
                    </option>
                  ) : null;
                })}
              </FormSelect>
              <FormInput
                register={register}
                error={errors?.document?.message}
                label="Documento"
                name="document"
                placeholder="Documento"
              />
            </Box>
          </Flex>
          <Button
            onClick={handleSubmit(onSubmit)}
            p="4"
            mx="4"
            mt="6"
            w="90%"
            colorScheme="blue"
            variant="solid"
          >
            Enviar
          </Button>
        </form>
      </Center>
      <Alert leastDestructiveRef={okRef} onClose={onClose} isOpen={isOpen} />{' '}
    </Flex>
  );
}
