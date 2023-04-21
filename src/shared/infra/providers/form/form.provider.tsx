import { useState, FormEvent, useCallback, useMemo, useEffect } from 'react';

import {
  FormErrors,
  FormProviderProps,
} from 'shared/domain/interfaces/form-storage.interface';
import { FormContext } from './form.context';
import { yupValidation } from './utils';

export const FormProvider = <FormFields extends object>({
  initialValues,
  children,
  onSubmit,
  validations,
}: FormProviderProps<FormFields>) => {
  const [values, setValues] = useState<FormFields>(initialValues);
  const [errors, setErrors] = useState<FormErrors<FormFields>>({});
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);

  const setFieldErrors = useCallback(
    (field: string, errors: string[] | null) => {
      setErrors(init => ({
        ...init,
        [field]: errors,
      }));
    },
    [],
  );

  const onChangeField = useCallback((name: string, value: any) => {
    setValues(init => ({
      ...init,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, []);

  const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    const { values, ...otherValuesToProvide } = valuesToProvide;
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    if (validations) {
      const errors = yupValidation(fieldValues, validations);
      if (errors) {
        setErrors(errors as FormErrors<FormFields>);
        return;
      }
    }
    onSubmit(e, {
      values: Object.assign(values, fieldValues),
      ...otherValuesToProvide,
    });
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const valuesToProvide = useMemo(
    () => ({
      values,
      onChangeField,
      resetForm,
      errors,
      setErrors,
      setFieldErrors,
      validations,
      wasSubmitted,
    }),
    [errors, onChangeField, resetForm, setFieldErrors, values, wasSubmitted],
  );

  return (
    <FormContext.Provider value={valuesToProvide}>
      <form noValidate onSubmit={_onSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};
