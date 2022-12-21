import { validateCpf } from '../cpf';

describe('CPF', () => {
  test('números de listas negras', () => {
    expect(validateCpf('00000000000')).toBeFalsy();
    expect(validateCpf('11111111111')).toBeFalsy();
    expect(validateCpf('22222222222')).toBeFalsy();
    expect(validateCpf('33333333333')).toBeFalsy();
    expect(validateCpf('44444444444')).toBeFalsy();
    expect(validateCpf('55555555555')).toBeFalsy();
    expect(validateCpf('66666666666')).toBeFalsy();
    expect(validateCpf('77777777777')).toBeFalsy();
    expect(validateCpf('88888888888')).toBeFalsy();
    expect(validateCpf('99999999999')).toBeFalsy();
    expect(validateCpf('12345678909')).toBeFalsy();
  });

  test('rejeita valores falsos', () => {
    expect(validateCpf('')).toBeFalsy();
    expect(validateCpf(null as any)).toBeFalsy();
    expect(validateCpf(undefined as any)).toBeFalsy();
  });

  test('valida strings formatadas', () => {
    expect(validateCpf('295.379.955-93')).toBeTruthy();
  });

  test('valida strings não formatadas', () => {
    expect(validateCpf('29537995593')).toBeTruthy();
  });

  test('valida strings de caracteres confusas', () => {
    expect(validateCpf('295$379\n955...93')).toBeTruthy();
  });

  test('valida cadeias de caracteres', () => {
    expect(validateCpf('295$379\n955...93', true)).toBeFalsy();
    expect(validateCpf('295.379.955-93', true)).toBeTruthy();
    expect(validateCpf('29537995593', true)).toBeTruthy();
  });
});
