import { useEffect, useMemo } from 'react';
import { useFormStorage } from 'shared/infra/adapters/form-storage.adapter';
import styles from './input.module.scss';

export type Props = {
  label: string;
  name: string;
  id?: string;
  type?: 'text' | 'email' | 'number' | 'password';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SlowInput = ({
  label,
  name,
  id,
  type = 'text',
  onChange,
}: Props) => {
  const {
    values,
    onChangeField,
    errors,
    setFieldErrors,
    wasSubmitted,
    validations,
  } = useFormStorage();

  const _id = useMemo(() => id || name, [id, name]);

  const errorMessage: string = useMemo(() => {
    if (errors[name]) {
      return errors[name][0];
    }
    return '';
  }, [errors, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeField(e.target.name, e.target.value);
    setFieldErrors(e.target.name, null);
    onChange && onChange(e);
  };

  const validate = () => {
    try {
      if (validations) {
        validations[name](values[name]);
      }
    } catch (e: any) {
      const error = e.errors?.[0] || e.message || 'Campo inválido';
      setFieldErrors(name, [error]);
    }
  };

  useEffect(() => {
    if (wasSubmitted) {
      validate();
    }
  }, [wasSubmitted]);

  return (
    <div className={styles.box}>
      <label htmlFor={_id}>{label}</label>
      <input
        type={type}
        id={_id}
        name={name}
        value={values[name]}
        onChange={handleChange}
      />
      <span className={styles.error}>{errorMessage}</span>
    </div>
  );
};
