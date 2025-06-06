import { Responsible } from './responsible';

export class Company {
  constructor(
    public readonly id: string,
    public name: string,
    public responsible: Responsible,
  ) {}
}
