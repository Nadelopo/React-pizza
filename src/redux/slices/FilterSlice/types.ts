export type TsortProperty =
  | 'rating'
  | 'price'
  | 'title'
  | '-rating'
  | '-price'
  | '-title'

export interface IfilterSlice {
  categoryId: number
  sort: ISortName
  search: string
  page: number
}

export interface ISortName {
  name: string
  sortProperty: TsortProperty
}
