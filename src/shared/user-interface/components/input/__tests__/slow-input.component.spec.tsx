import {
  fireEvent,
  render,
  screen,
  userEvent,
} from 'shared/testing/test-utils';
import { FormProvider } from 'shared/infra/providers/form/form.provider';
import { SlowInput, Props as InputProps } from '../slow-input.component';

type Props = {
  inputProps?: InputProps | {};
  nameValue?: string;
  validator?: () => any;
};

const renderInput = (
  { inputProps = {}, nameValue = '', validator }: Props = {
    inputProps: {},
    nameValue: '',
    validator: () => void 0,
  },
) =>
  render(
    <FormProvider
      initialValues={{ name: nameValue }}
      onSubmit={jest.fn()}
      validator={validator}
    >
      <SlowInput label="name" name="name" {...inputProps} />
      <button type="submit">submit</button>
    </FormProvider>,
  );

const getInput = () => screen.getByLabelText('name');

describe('SlowInput', () => {
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
});
