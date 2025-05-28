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
      expect(() => pipe.transform(invalidCPF)).toThrow('Invalid CPF');
    });

    it('should reject a CPF with all same digits', () => {
      const invalidCPF = '111.111.111-11';
      expect(() => pipe.transform(invalidCPF)).toThrow(BadRequestException);
      expect(() => pipe.transform(invalidCPF)).toThrow('Invalid CPF');
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
      expect(() => pipe.transform(invalidCNPJ)).toThrow('Invalid CNPJ');
    });

    it('should reject a CNPJ with all same digits', () => {
      const invalidCNPJ = '11.111.111/1111-11';
      expect(() => pipe.transform(invalidCNPJ)).toThrow(BadRequestException);
      expect(() => pipe.transform(invalidCNPJ)).toThrow('Invalid CNPJ');
    });
  });

  describe('Invalid document length', () => {
    it('should reject a document with invalid length', () => {
      const invalidDocument = '123456789';
      expect(() => pipe.transform(invalidDocument)).toThrow(BadRequestException);
      expect(() => pipe.transform(invalidDocument)).toThrow(
        'Document must have 11 digits (CPF) or 14 digits (CNPJ)',
      );
    });
  });
});
