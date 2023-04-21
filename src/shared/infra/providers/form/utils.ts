import { yup } from 'shared/domain/validator';

export const yupValidation = (
  values: Record<string, any>,
  validations: Record<symbol, yup.AnySchema>,
) => {
  try {
    yup.object().shape(validations).validateSync(values, {
      abortEarly: false,
    });
    return null;
  } catch (errors) {
    const formErrors: Record<symbol, yup.AnySchema> = {};
    const e = errors as yup.ValidationError;
    e.inner.forEach(error => {
      const path = String(error.path);
      if (!formErrors[path]) {
        formErrors[path] = [];
      }
      formErrors[path].push(error.message);
    });
    return formErrors;
  }
};
