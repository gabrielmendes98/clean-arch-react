export class InvalidDocumentError extends Error {
  constructor(message?: string) {
    super(message || 'Document must be a valid CPF or CNPJ');
    this.name = 'InvalidDocumentError';
  }
}
