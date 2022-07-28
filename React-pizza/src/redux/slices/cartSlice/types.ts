export interface Iitem {
  id: string
  activeSize: number
  activeType: string
  count: number
  imageUrl: string
  title: string
  price: number
}

export interface IinitialState {
  totalPrice: number
  cartItems: Iitem[]
}
