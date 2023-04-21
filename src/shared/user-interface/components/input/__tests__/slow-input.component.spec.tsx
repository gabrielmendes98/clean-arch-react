import { render, screen, userEvent } from 'shared/testing/test-utils';
import { FormProvider } from 'shared/infra/providers/form/form.provider';
import { SlowInput, Props as InputProps } from '../slow-input.component';

type Props = {
  inputProps?: InputProps | {};
  nameValue?: string;
  validations?: Partial<{
    name: (value: any) => boolean;
  }>;
};

const renderInput = (
  { inputProps = {}, nameValue = '', validations }: Props = {
    inputProps: {},
    nameValue: '',
  },
) =>
  render(
    <FormProvider
      initialValues={{ name: nameValue }}
      onSubmit={jest.fn()}
      validations={validations}
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
});
