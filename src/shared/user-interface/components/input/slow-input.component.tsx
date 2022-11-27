import { useMemo } from 'react';
import { useFormContext } from 'shared/infra/store/form/form.hook';

type Props = {
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
  const { values, onChangeField } = useFormContext();

  const _id = useMemo(() => id || name, [id, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeField(e.target.name, e.target.value);
    onChange && onChange(e);
  };

  return (
    <div>
      <label htmlFor={_id}>{label}</label>
      <input
        type={type}
        id={_id}
        name={name}
        value={values[name]}
        onChange={handleChange}
      />
    </div>
  );
};
