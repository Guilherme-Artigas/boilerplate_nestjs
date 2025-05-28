import { DocumentValidatorPipe } from '../pipes/document-validator.pipe';
import { BadRequestException } from '@nestjs/common';

describe('DocumentValidatorPipe', () => {
  let pipe: DocumentValidatorPipe;

  beforeEach(() => {
    pipe = new DocumentValidatorPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('CPF validation', () => {
    it('should accept a valid CPF', () => {
      const validCPF = '529.982.247-25';
      expect(pipe.transform(validCPF)).toBe('52998224725');
    });

    it('should reject an invalid CPF', () => {
      const invalidCPF = '123.456.789-00';
      expect(() => pipe.transform(invalidCPF)).toThrow(BadRequestException);
      expect(() => pipe.transform(invalidCPF)).toThrow('CPF inválido');
    });

    it('should reject a CPF with all same digits', () => {
      const invalidCPF = '111.111.111-11';
      expect(() => pipe.transform(invalidCPF)).toThrow(BadRequestException);
      expect(() => pipe.transform(invalidCPF)).toThrow('CPF inválido');
    });
  });

  describe('CNPJ validation', () => {
    it('should accept a valid CNPJ', () => {
      const validCNPJ = '33.014.556/0001-96';
      expect(pipe.transform(validCNPJ)).toBe('33014556000196');
    });

    it('should reject an invalid CNPJ', () => {
      const invalidCNPJ = '12.345.678/0001-90';
      expect(() => pipe.transform(invalidCNPJ)).toThrow(BadRequestException);
      expect(() => pipe.transform(invalidCNPJ)).toThrow('CNPJ inválido');
    });

    it('should reject a CNPJ with all same digits', () => {
      const invalidCNPJ = '11.111.111/1111-11';
      expect(() => pipe.transform(invalidCNPJ)).toThrow(BadRequestException);
      expect(() => pipe.transform(invalidCNPJ)).toThrow('CNPJ inválido');
    });
  });

  describe('Invalid document length', () => {
    it('should reject a document with invalid length', () => {
      const invalidDocument = '123456789';
      expect(() => pipe.transform(invalidDocument)).toThrow(BadRequestException);
      expect(() => pipe.transform(invalidDocument)).toThrow(
        'Documento deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ)',
      );
    });
  });
});
