import { useMemo } from 'react';
import { useFormStorage } from 'shared/infra/hooks/use-form-storage.hook';
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
  const { values, onChangeField, errors, setFieldErrors, validator } =
    useFormStorage();

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
    if (validator) {
      const errors = validator(values);
      if (errors && errors[name]) {
        setFieldErrors(name, errors[name]);
      }
    }
  };

  return (
    <div className={styles.box}>
      <label htmlFor={_id}>{label}</label>
      <input
        type={type}
        id={_id}
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={validate}
      />
      <span className={styles.error}>{errorMessage}</span>
    </div>
  );
};
