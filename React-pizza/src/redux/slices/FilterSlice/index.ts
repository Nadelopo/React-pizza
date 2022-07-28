import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import qs from 'qs'
import { IfilterSlice, ISortName } from './types'

const getPageFromUrl = () =>
  window.location.search
    ? Number(qs.parse(window.location.search.substring(1)).page)
    : 1

const initialState: IfilterSlice = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  search: '',
  page: getPageFromUrl(),
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.page = 1
      state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<ISortName>) {
      state.sort = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.page = 1
      state.search = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
  },
})

export const { setCategoryId, setSort, setSearch, setPage } =
  filterSlice.actions

export default filterSlice.reducer
