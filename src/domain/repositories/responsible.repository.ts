import { Responsible } from './../entities/responsible';

export abstract class ResponsibleRepository {
  abstract findAll(): Promise<Responsible[]>;
  abstract create(responsible: Responsible): Promise<Responsible>;
  abstract findOne(id: string): Promise<Responsible | null>;
  abstract delete(id: string): Promise<void | null>;
}
