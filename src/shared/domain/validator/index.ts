/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-template-curly-in-string */
/* istanbul ignore file */
import * as yup from 'yup';
import { NotificationError } from '../notification/notification.error';
import { printValue } from './util';

export class ValidationError extends Error {
  constructor(public errors?: string[]) {
    super('Erro de validação');
    this.name = 'ValidationError';
  }
}

export type Validations = {
  [key: string]: (value: any) => boolean;
};

export interface Validator<T> {
  validate: (entityOrVO: T) => void;
}

export const validationMessages = {
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
  number: {
    min: '${path} deve ser maior ou igual a ${min}',
    max: '${path} deve menor ou igual a ${max}',
    lessThan: '${path} deve ser menor que ${less}',
    moreThan: '${path} deve ser maior que ${more}',
    notEqual: '${path} não deve ser igual a ${notEqual}',
    positive: '${path} deve ser um número positivo',
    negative: '${path} deve ser um número negativo',
    integer: '${path} deve ser um número inteiro',
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
        this.label(label).validateSync(value, { strict: true });
        return true;
      }
      this.validateSync(value, { strict: true });
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError)
        throw new ValidationError(error.errors);
    }
  },
);

export { yup };
