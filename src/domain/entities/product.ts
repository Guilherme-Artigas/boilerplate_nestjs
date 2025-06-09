import { v4 as uuidv4 } from 'uuid';
export class Product {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public companyId: string;

  constructor(
    name: string,
    description: string,
    price: number,
    companyId: string,
    id?: string,
  ) {
    this.id = id ?? uuidv4();
    this.name = name;
    this.description = description;
    this.price = price;
    this.companyId = companyId;
  }
}
