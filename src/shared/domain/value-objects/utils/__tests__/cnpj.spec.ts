import { validateCnpj } from '../cnpj';

describe('CNPJ', () => {
  test('números de listas negras', () => {
    expect(validateCnpj('00000000000000')).toBeFalsy();
    expect(validateCnpj('11111111111111')).toBeFalsy();
    expect(validateCnpj('22222222222222')).toBeFalsy();
    expect(validateCnpj('33333333333333')).toBeFalsy();
    expect(validateCnpj('44444444444444')).toBeFalsy();
    expect(validateCnpj('55555555555555')).toBeFalsy();
    expect(validateCnpj('66666666666666')).toBeFalsy();
    expect(validateCnpj('77777777777777')).toBeFalsy();
    expect(validateCnpj('88888888888888')).toBeFalsy();
    expect(validateCnpj('99999999999999')).toBeFalsy();
  });

  test('rejeita valores falsos', () => {
    expect(validateCnpj('')).toBeFalsy();
    expect(validateCnpj(null as any)).toBeFalsy();
    expect(validateCnpj(undefined as any)).toBeFalsy();
  });

  test('valida strings formatadas', () => {
    expect(validateCnpj('54.550.752/0001-55')).toBeTruthy();
  });

  test('valida strings não formatadas', () => {
    expect(validateCnpj('54550752000155')).toBeTruthy();
  });

  test('valida strings confusas', () => {
    expect(validateCnpj('54550[752#0001..$55')).toBeTruthy();
  });

  test('valida cadeias de caracteres', () => {
    expect(validateCnpj('54550[752#0001..$55', true)).toBeFalsy();
    expect(validateCnpj('54.550.752/0001-55', true)).toBeTruthy();
    expect(validateCnpj('54550752000155', true)).toBeTruthy();
  });
});
