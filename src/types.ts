export interface Product {
  id: number
  name: string
  price: number
  stock: number
  status: 'available' | 'out-of-stock' | 'low-stock'
  image: string
}
