import { renderHook } from 'shared/testing/test-utils';
import { FormProvider } from 'shared/infra/providers/form/form.provider';
import { useFormStorage } from '../use-form-storage.hook';

describe('useFormStorage', () => {
  it('should return all provider values', () => {
    const wrapper = ({ children }) => (
      <FormProvider
        initialValues={{ name: '' }}
        onSubmit={jest.fn()}
        validator={jest.fn()}
      >
        {children}
      </FormProvider>
    );
    const { result } = renderHook(() => useFormStorage(), { wrapper });
    expect(result.current.errors).toBeDefined();
    expect(result.current.onChangeField).toBeDefined();
    expect(result.current.resetForm).toBeDefined();
    expect(result.current.setErrors).toBeDefined();
    expect(result.current.setFieldErrors).toBeDefined();
    expect(result.current.validator).toBeDefined();
    expect(result.current.values).toBeDefined();
    expect(result.current.wasSubmitted).toBeDefined();
  });

  it('should throw error when use service without provider', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    expect(() => renderHook(() => useFormStorage())).toThrow(
      'useFormStorage must be used under FormProvider',
    );
  });
});
