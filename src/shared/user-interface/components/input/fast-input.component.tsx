import { useEffect, useMemo, useState } from 'react';
import { useFormStorage } from 'shared/infra/adapters/form-storage.adapter';
import styles from './input.module.scss';

type Props = {
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
  const { validations, wasSubmitted, values } = useFormStorage();
  const [value, setValue] = useState(values[name]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const _id = useMemo(() => id || name, [id, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setErrorMessage('');
    onChange && onChange(e);
  };

  const validate = () => {
    try {
      validations[name](value);
    } catch (e: any) {
      const error = e.errors?.[0] || e.message || 'Campo inválido';
      setErrorMessage(error);
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
        value={value}
        onChange={handleChange}
        onBlur={validate}
      />
      <span className={styles.error}>{errorMessage}</span>
    </div>
  );
};
