import { v4 as uuidv4 } from 'uuid';

export class Company {
  public id: string;
  public name: string;
  public responsibleId: string;

  constructor(name: string, responsibleId: string, id?: string) {
    this.id = id ?? uuidv4();
    this.name = name;
    this.responsibleId = responsibleId;
  }
}
