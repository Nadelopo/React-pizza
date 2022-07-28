export interface Item {
  id: string
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  raiting: number
}

export enum Estatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSlice {
  items: Item[]
  countPages: number
  status: Estatus
}

export interface IgetCountPage {
  category: number | null
  search: string
  limit: number
}
export interface IgetItems {
  page: number
  orderBy: string
  category: number | null
  search: string
  limit: number
  order: string
}
