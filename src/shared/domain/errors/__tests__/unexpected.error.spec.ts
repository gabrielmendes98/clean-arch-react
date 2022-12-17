import { UnexpectedError } from '../unexpected.error';

describe('UnexpectedError', () => {
  test('name and default message ', () => {
    const error = new UnexpectedError();
    expect(error.name).toBe('UnexpectedError');
    expect(error.message).toBe(
      'Algo de errado aconteceu. Tente novamente mais tarde.',
    );
  });
});
