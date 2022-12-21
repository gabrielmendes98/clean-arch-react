import { useContext } from 'react';
import { act, renderHook } from 'shared/testing/test-utils';
import { FormContext, FormProvider } from '../form.provider';

const useHook = () => {
  const wrapper = ({ children }) => (
    <FormProvider initialValues={{ name: '' }} onSubmit={jest.fn()}>
      {children}
    </FormProvider>
  );
  return renderHook(() => useContext(FormContext), { wrapper });
};

describe('FormProvider', () => {
  test('initial errors', () => {
    const { result } = useHook();
    expect(result.current?.errors).toStrictEqual({});
  });
  test('initial values', () => {
    const { result } = useHook();
    expect(result.current?.values).toStrictEqual({ name: '' });
  });
  test('onChangeField', () => {
    const { result } = useHook();
    act(() => {
      result.current?.onChangeField('name', 'some value');
    });
    expect(result.current?.values).toStrictEqual({ name: 'some value' });
  });
  test('setErrors', () => {
    const { result } = useHook();
    act(() => {
      result.current?.setErrors({ name: ['some error'] });
    });
    expect(result.current?.errors).toStrictEqual({ name: ['some error'] });
  });
  test('resetForm', async () => {
    const { result } = useHook();
    act(() => {
      result.current?.onChangeField('name', 'some value');
    });
    expect(result.current?.values).toStrictEqual({ name: 'some value' });
    act(() => {
      result.current?.setErrors({ name: ['some error'] });
    });
    expect(result.current?.errors).toStrictEqual({ name: ['some error'] });
    act(() => {
      result.current?.resetForm();
    });
    expect(result.current?.errors).toStrictEqual({});
    expect(result.current?.values).toStrictEqual({ name: '' });
  });
  test('setFieldErrors', () => {
    const { result } = useHook();
    act(() => {
      result.current?.setFieldErrors('name', ['some error']);
    });
    expect(result.current?.errors).toStrictEqual({ name: ['some error'] });
  });
  test('validations', () => {
    const { result } = useHook();
    expect(result.current?.validations).not.toBeDefined();
  });
  test('wasSubmitted', () => {
    const { result } = useHook();
    expect(result.current?.wasSubmitted).toBeFalsy();
  });
});
