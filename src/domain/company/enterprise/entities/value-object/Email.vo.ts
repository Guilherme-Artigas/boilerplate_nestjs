import { CustomError } from '@core/errors/CustomError';

export class Email {
  private readonly email: string;

  private constructor(email: string) {
    this.email = email;
  }

  public static create(email: string): Email {
    if (!this.isValid(email)) {
      throw new CustomError('Invalid email format', 400);
    }
    return new Email(email);
  }

  private static isValid(email: string): boolean {
    // RFC 5322 compliant regex for email validation
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  public get value(): string {
    return this.email;
  }

  public equals(email: Email): boolean {
    return this.email === email.value;
  }

  public toString(): string {
    return this.email;
  }
}
