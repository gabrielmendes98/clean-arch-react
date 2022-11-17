/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';
import printValue from './util';

const validationMessages = {
  mixed: {
    default: 'Campo Inválido',
    required: 'Campo Obrigatório',
    notType: ({ path, type, value, originalValue }: any) => {
      const isCast = originalValue != null && originalValue !== value;
      let msg = `${
        `${path} deve ser do tipo \`${type}\`, ` +
        `mas o valor final é: \`${printValue(value, true)}\``
      }${
        isCast ? ` (cast do valor \`${printValue(originalValue, true)}\`)` : ''
      }`;

      if (value === null) {
        msg +=
          '\nse a intenção era usar "null" como um valor em branco marque o esquema como `.nullable()`';
      }

      return msg;
    },
  },
  string: {
    min: 'Campo inválido (mínimo ${min} caracteres)',
    max: 'Campo inválido (máximo ${max} caracteres)',
    length: 'Campo inválido (deve ter ${length} caracteres)',
  },
};

yup.setLocale(validationMessages);

export { yup as validator };
