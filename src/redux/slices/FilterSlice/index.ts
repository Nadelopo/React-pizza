import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import qs from 'qs'
import { IfilterSlice, ISortName } from './types'

const locationSearch = qs.parse(window.location.search.substring(1))

const getPageFromUrl = () =>
  locationSearch.page ? Number(locationSearch.page) : 1

const getCategoryFromUrl = () =>
  locationSearch.category ? Number(locationSearch.category) : 0

const getSearchFromUrl = () =>
  locationSearch.search ? String(locationSearch.search) : ''

const getSortFromUrl = () => {
  let sort: ISortName = {
    name: 'популярности (DESC)',
    sortProperty: 'rating',
  }
  if (locationSearch && typeof locationSearch.sort === 'string') {
    if (locationSearch.sort.includes('rating')) {
      sort = {
        name:
          'популярности ' +
          (locationSearch.sort.includes('-') ? '(ASC)' : '(DESC)'),
        sortProperty: locationSearch.sort.includes('-') ? '-rating' : 'rating',
      }
    } else if (locationSearch.sort.includes('price')) {
      sort = {
        name:
          'цене ' + (locationSearch.sort.includes('-') ? '(ASC)' : '(DESC)'),
        sortProperty: locationSearch.sort.includes('-') ? '-price' : 'price',
      }
    } else if (locationSearch.sort.includes('title')) {
      sort = {
        name:
          'алфавиту ' +
          (locationSearch.sort.includes('-') ? '(ASC)' : '(DESC)'),
        sortProperty: locationSearch.sort.includes('-') ? '-title' : 'title',
      }
    }
  }
  return sort
}
getSortFromUrl()
const initialState: IfilterSlice = {
  categoryId: getCategoryFromUrl(),
  sort: getSortFromUrl(),
  search: getSearchFromUrl(),
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
