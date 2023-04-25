import { useEffect, useMemo, useState } from 'react';
import { useFormStorage } from 'shared/infra/hooks/use-form-storage.hook';
import styles from './input.module.scss';

export type Props = {
  label: string;
  name: string;
  id?: string;
  type?: 'text' | 'email' | 'number' | 'password';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FastInput = ({
  label,
  name,
  id,
  type = 'text',
  onChange,
}: Props) => {
  const { wasSubmitted, values, validator, setValues } = useFormStorage();
  const [value, setValue] = useState(values[name]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const _id = useMemo(() => id || name, [id, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setErrorMessage('');
    onChange && onChange(e);
  };

  const validate = () => {
    if (validator) {
      const errors = validator({
        ...values,
        [name]: value,
      });
      if (errors && errors[name]) {
        const error = errors[name][0];
        setErrorMessage(error);
      }
    }
  };

  const onBlur = () => {
    validate();
    setValues({
      ...values,
      [name]: value,
    });
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
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
      />
      <span className={styles.error}>{errorMessage}</span>
    </div>
  );
};
