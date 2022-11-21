type Errors = {
  [key: string]: string[];
};

// name: 'ValidationError'
// message: Erro de validação
// errors: ['erro 1', 'erro 2']
export class ValidationError extends Error {
  constructor(public errors?: string[]) {
    super('Erro de validação');
    this.name = 'ValidationError';
  }
}

// name: 'EntityValidationError'
// message: Erro de validação de entidade
// errors: {
//   field1: ['erro 1', 'erro 2'],
//   field2: ['erro 1', 'erro 2'],
// }
export class EntityValidationError extends Error {
  constructor(public errors?: Errors) {
    super('Erro de validação de entidade');
    this.name = 'EntityValidationError';
  }
}
