/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';
import {
  EntityValidationError,
  ValidationError,
} from '../errors/validation.error';
import printValue from './util';

const validationMessages = {
  mixed: {
    default: '${path} é inválido',
    required: '${path} é obrigatório',
    oneOf: '${path} deve ter um dos seguintes valores: ${values}',
    notOneOf: '${path} não deve ter nenhum dos seguintes valores: ${values}',
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
    length: ({ path, length }: any) =>
      `${path} deve ter exatamente ${length} ${
        length === 1 ? 'caractere' : 'caracteres'
      }`,
    min: ({ path, min }: any) =>
      `${path} deve ter pelo menos ${min} ${
        min === 1 ? 'caractere' : 'caracteres'
      }`,
    max: ({ path, max }: any) =>
      `${path} deve ter no máximo ${max} ${
        max === 1 ? 'caractere' : 'caracteres'
      }`,
    matches: '${path} deve corresponder ao padrão: "${regex}"',
    email: '${path} deve ser um e-mail válido',
    url: '${path} deve ser uma URL válida',
    trim: '${path} não deve conter espaços adicionais no início nem no fim',
    lowercase: '${path} deve estar em letras minúsculas',
    uppercase: '${path} deve estar em letras maiúsculas',
  },
};

yup.setLocale(validationMessages);

// TODO fix add method ts error
yup.addMethod(
  // @ts-ignore
  yup.BaseSchema,
  'validateAttribute',
  function (value: any, label?: string) {
    try {
      if (label) {
        this.label(label).validateSync(value);
        return true;
      }
      this.validateSync(value, { strict: true });
      return true;
    } catch (error) {
      if (error instanceof validator.ValidationError)
        throw new ValidationError(error.errors);
    }
  },
);

// TODO fix add method ts error
// @ts-ignore
yup.addMethod(yup.BaseSchema, 'validateEntity', function (value: any) {
  try {
    this.validateSync(value, { strict: true, abortEarly: false });
    return true;
  } catch (e) {
    if (e instanceof validator.ValidationError) {
      const errors = e.inner.reduce((prev, next) => {
        return { ...prev, [String(next.path)]: next.errors };
      }, {});
      throw new EntityValidationError(errors);
    }
    throw new EntityValidationError({});
  }
});

const validator = yup;
export { validator };
