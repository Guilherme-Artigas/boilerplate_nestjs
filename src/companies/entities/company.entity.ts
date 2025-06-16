export class Company {
  id: string
  name: string
  document: string // CNPJ
  email: string
  phone: string
  website?: string | null
  address: string
  isActived?: boolean
}
