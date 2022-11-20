export class InvalidDocumentError extends Error {
  constructor(message?: string) {
    super(message || 'Documento deve ser um CPF ou CNPJ valido');
    this.name = 'InvalidDocumentError';
  }
}
