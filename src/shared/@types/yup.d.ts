declare module 'yup' {
  import { BaseSchema } from 'yup';
  interface BaseSchema {
    validateAttribute(value: any, label?: string): boolean;
    validateEntity(value: any): boolean;
  }
}

export {};
