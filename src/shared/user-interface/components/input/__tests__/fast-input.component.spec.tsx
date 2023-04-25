import { yup } from 'shared/domain/validator';
import {
  fireEvent,
  render,
  screen,
  userEvent,
} from 'shared/testing/test-utils';
import { FormProvider } from 'shared/infra/providers/form/form.provider';
import { FastInput, Props as InputProps } from '../fast-input.component';

type Props = {
  inputProps?: InputProps | {};
  nameValue?: string;
  validator?: () => any;
};

const renderInput = (
  { inputProps = {}, nameValue = '', validator }: Props = {
    inputProps: {},
    nameValue: '',
  },
) =>
  render(
    <FormProvider
      initialValues={{ name: nameValue }}
      onSubmit={jest.fn()}
      validator={validator}
    >
      <FastInput label="name" name="name" {...inputProps} />
      <button type="submit">submit</button>
    </FormProvider>,
  );

const getInput = () => screen.getByLabelText('name');

describe('FastInput', () => {
  it('should init value with form provider initial value', () => {
    renderInput({ nameValue: 'initial name' });
    expect(getInput()).toHaveValue('initial name');
  });

  it('should set id with name if not pass id', () => {
    renderInput();
    expect(getInput()).toHaveAttribute('id', 'name');
  });

  it('should set value', () => {
    renderInput();
    userEvent.type(getInput(), 'some value');
    expect(getInput()).toHaveValue('some value');
  });

  it('should validate on blur', () => {
    renderInput({
      validator: () => {
        return {
          name: ['Nome é obrigatório'],
        };
      },
    });
    userEvent.click(getInput());
    fireEvent.blur(getInput());
    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
  });

  it('should call onChange method', () => {
    const onChange = jest.fn();
    renderInput({
      inputProps: {
        onChange,
      },
    });
    userEvent.type(getInput(), 'some value');
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'some value',
        }),
      }),
    );
  });
});
