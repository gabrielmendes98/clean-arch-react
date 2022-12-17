import { FormProvider } from 'shared/infra/providers/form.provider';
import { act, renderHook } from 'shared/testing/test-utils';
import { useFormStorage } from '../form-storage.adapter';

describe('useFormStorage', () => {
  it('should return all provider values', () => {
    const wrapper = ({ children }) => (
      <FormProvider initialValues={{ name: '' }} onSubmit={jest.fn()}>
        {children}
      </FormProvider>
    );
    const { result } = renderHook(() => useFormStorage(), { wrapper });
    expect(result.current.errors).toStrictEqual({});
    act(() => {
      result.current.onChangeField('name', 'some value');
    });
    expect(result.current.values).toStrictEqual({ name: 'some value' });
    act(() => {
      result.current.setErrors({ name: ['some error'] });
    });
    expect(result.current.errors).toStrictEqual({ name: ['some error'] });
    act(() => {
      result.current.resetForm();
    });
    expect(result.current.values).toStrictEqual({ name: '' });
    act(() => {
      result.current.setFieldErrors('name', ['some error']);
    });
    expect(result.current.errors).toStrictEqual({ name: ['some error'] });
    expect(result.current.validations).toStrictEqual({});
    expect(result.current.wasSubmitted).toBeFalsy();
  });
});
