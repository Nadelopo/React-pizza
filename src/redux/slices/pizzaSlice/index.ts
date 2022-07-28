import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Estatus, IgetCountPage, IgetItems, IPizzaSlice, Item } from './types'

export const getCountPage = createAsyncThunk<
  { data: Item[]; limit: number },
  IgetCountPage
>('pizza/getPages', async (params) => {
  const { category, search, limit } = params
  const { data } = await axios.get<Item[]>(
    'https://62ced2ed486b6ce8264d6e96.mockapi.io/items',
    {
      params: {
        category,
        search,
      },
    }
  )
  return { data, limit }
})

export const getItems = createAsyncThunk<Item[], IgetItems>(
  'pizza/getItems',
  async (params) => {
    const { page, limit, category, search, orderBy, order } = params
    const { data } = await axios.get(
      'https://62ced2ed486b6ce8264d6e96.mockapi.io/items',
      {
        params: {
          page,
          limit,
          category,
          orderBy,
          order,
          search,
        },
      }
    )
    return data
  }
)

const initialState: IPizzaSlice = {
  items: [],
  countPages: 0,
  status: Estatus.LOADING,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountPage.fulfilled, (state, action) => {
      state.countPages = Math.ceil(
        action.payload.data.length / action.payload.limit
      )
    })

    builder.addCase(getItems.pending, (state) => {
      state.status = Estatus.LOADING
    })

    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Estatus.SUCCESS
    })

    builder.addCase(getItems.rejected, (state) => {
      state.status = Estatus.ERROR
    })
  },
})

export default pizzaSlice.reducer
