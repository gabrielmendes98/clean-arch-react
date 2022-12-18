import { FormProvider } from 'shared/infra/providers/form.provider';
import { renderHook } from 'shared/testing/test-utils';
import { useFormStorage } from '../form-storage.adapter';

describe('useFormStorage', () => {
  it('should return all provider values', () => {
    const wrapper = ({ children }) => (
      <FormProvider initialValues={{ name: '' }} onSubmit={jest.fn()}>
        {children}
      </FormProvider>
    );
    const { result } = renderHook(() => useFormStorage(), { wrapper });
    expect(result.current.errors).toBeDefined();
    expect(result.current.onChangeField).toBeDefined();
    expect(result.current.resetForm).toBeDefined();
    expect(result.current.setErrors).toBeDefined();
    expect(result.current.setFieldErrors).toBeDefined();
    expect(result.current.validations).toBeDefined();
    expect(result.current.values).toBeDefined();
    expect(result.current.wasSubmitted).toBeDefined();
  });
});
