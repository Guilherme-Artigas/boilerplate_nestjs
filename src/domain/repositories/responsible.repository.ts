import { Responsible } from './../entities/responsible';

export abstract class ResponsibleRepository {
  abstract findAll(): Promise<Responsible[]>;
  abstract create(responsible: Responsible): Promise<void>;
  abstract findOne(id: string): Promise<Responsible | null>;
  abstract delete(id: string): Promise<boolean>;
}
