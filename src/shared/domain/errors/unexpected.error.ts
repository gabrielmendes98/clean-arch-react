export const UNEXPECTED_ERROR_MESSAGE =
  'Algo de errado aconteceu. Tente novamente mais tarde.';

export class UnexpectedError extends Error {
  constructor() {
    super(UNEXPECTED_ERROR_MESSAGE);
    this.name = 'UnexpectedError';
  }
}
