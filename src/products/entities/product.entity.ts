export class Product {
  id: string // UUID
  name: string
  description?: string | null
  price: number
  stock: number
  companyId: string // Company UUID
  isActived?: boolean
}
