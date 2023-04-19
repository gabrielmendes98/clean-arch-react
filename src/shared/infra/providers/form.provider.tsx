import {
  createContext,
  useState,
  FormEvent,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  FormErrors,
  FormProviderProps,
  FormStorageService,
} from 'shared/domain/interfaces/form-storage.interface';
import { yup } from 'shared/domain/validator';

export const FormContext = createContext<FormStorageService<object> | null>(
  null,
);

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

  const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    try {
      const { values, ...otherValuesToProvide } = valuesToProvide;
      const formData = new FormData(e.currentTarget);
      const fieldValues = Object.fromEntries(formData.entries());
      yup
        .entityValidationSchema(
          (validations || {}) as Record<string, (value: string) => boolean>,
        )
        .validate(fieldValues);
      onSubmit(e, {
        values: Object.assign(values, fieldValues),
        ...otherValuesToProvide,
      });
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <FormContext.Provider value={valuesToProvide}>
      <form noValidate onSubmit={_onSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};
