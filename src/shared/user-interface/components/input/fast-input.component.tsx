import { useEffect, useMemo, useState } from 'react';
import { useFormStorage } from 'shared/infra/storage/form/form.storage';
import styles from './slow-input.module.scss';

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
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { validations, wasSubmitted } = useFormStorage();

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
      console.log('error', JSON.parse(JSON.stringify(e)));
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
