import * as yup from 'yup';
import countries from '../data/countries.json';
import types from '../data/person-types.json';
import typeDocuments from '../data/document-types.json';

export default yup.object().shape({
  country: yup
    .string()
    .required()
    .oneOf(
      countries.map((item) => {
        return item.iso;
      }),
      'pais no valido'
    ),
  type: yup
    .string()
    .required('pais es requerido')
    .oneOf(
      types.map((item) => {
        return item.value;
      }),
      'tipo de persona no valido'
    ),
  name: yup
    .string()
    .max(20, 'maximo 20 caracteres en el nombre')
    .when('type', (type, schema) =>
      type === 'natural' ? schema.required('nombre es requerido') : schema
    ),
  surnames: yup
    .string()
    .max(30, 'maximo 30 caracteres en apellidos')
    .when('type', (type, schema) =>
      type === 'natural' ? schema.required('apellidos es requerido') : schema
    ),
  company: yup
    .string()
    .max(30, 'maximo 30 caracteres en nombre de la sociedad ')
    .when('type', (type, schema) =>
      type === 'legal' ? schema.required('nombre de la sociedad es requerido') : schema
    ),
  typeDocument: yup
    .string()
    .required('tipo de documento es requerido')
    .when(['country', 'type'], (country, type, schema) => {
      let list;
      if (country === 'ESP') {
        list = typeDocuments.reduce(function (filtered, item) {
          if (item[type]) {
            filtered.push(item.value);
          }
          return filtered;
        }, []);
      } else {
        list = typeDocuments.reduce(function (filtered, item) {
          if (!item['spain']) {
            filtered.push(item.value);
          }
          return filtered;
        }, []);
      }
      return schema.oneOf(list, 'tipo de documento no valido');
    }),
  document: yup
    .string()
    .required('documento es requerido')
    .when(['country', 'typeDocument'], (country, typeDocument, schema) => {
      let regex;
      switch (typeDocument) {
        case 'passport':
          if (country === 'ESP') {
            regex = '/^[a-z]{3}[0-9]{6}[a-z]?$/i';
          } else {
            regex = '';
          }
          break;
        case 'nif':
          regex = '/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i';
          break;
        case 'nie':
          regex = '/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i';
          break;
        case 'dni':
          regex = '^[0-9]{8,8}[A-Za-z]$';
        default:
          regex = '';
          break;
      }
      return schema.matches(regex, 'documento formato invalido');
    }),
  address: yup
    .string()
    .max(50, 'maximo 50 caracteres en direccion')
    .required('direccion es requerido'),
  address2: yup
    .string()
    .max(20, 'maximo 20 caracteres en apto, unidad, edificio, piso, etc')
    .required('apto, unidad, edificio, piso, etc es requerido'),
  state: yup
    .string()
    .max(30, 'maximo 30 caracteres en provincia o estado')
    .required('provincia o estado es requerido'),
  city: yup
    .string()
    .max(30, 'maximo 30 caracteres en municipio o ciudad')
    .required('municipio o ciudad es requerido'),
  zip: yup
    .string()
    .max(10, 'maximo 10 caracteres en codigo postal')
    .required('codigo postal es requerido')
    .when('country', (country, schema) => {
        let regex = '';
        if(country === 'ESP') {
            regex = '/([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}/'
        }
        return schema.matches(regex, 'zip formato invalido');
      }),
});