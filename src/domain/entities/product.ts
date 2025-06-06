export class Product {
  constructor(
    private readonly id: string,
    public name: string,
    public description: string,
    public price: number,
    public companyId: string,
  ) {}
}
