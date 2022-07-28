import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IinitialState, Iitem } from './types'

const initialState: IinitialState = {
  totalPrice: Number(localStorage.getItem('totalPrice')) || 0,
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Iitem>) {
      const sameItem = state.cartItems.find(
        (item: Iitem) =>
          item.id === action.payload.id &&
          item.activeSize === action.payload.activeSize &&
          item.activeType === action.payload.activeType
      )

      if (sameItem) {
        state.cartItems = state.cartItems.map((e: Iitem) =>
          e.id === action.payload.id &&
          e.activeSize === action.payload.activeSize &&
          e.activeType === action.payload.activeType
            ? { ...e, count: e.count + 1 }
            : e
        )
      } else {
        state.cartItems.push({ ...action.payload, count: 1 })
      }

      state.totalPrice += action.payload.price
    },
    removeProduct(state, action: PayloadAction<Iitem>) {
      state.cartItems = state.cartItems.filter(
        (e: Iitem) =>
          e.id !== action.payload.id ||
          e.activeSize !== action.payload.activeSize ||
          e.activeType !== action.payload.activeType
      )
      state.totalPrice -= action.payload.price * action.payload.count
    },
    addOneProduct(state, action: PayloadAction<Iitem>) {
      state.cartItems = state.cartItems.map((e: Iitem) =>
        e.id === action.payload.id &&
        e.activeSize === action.payload.activeSize &&
        e.activeType === action.payload.activeType
          ? { ...e, count: e.count + 1 }
          : e
      )
      state.totalPrice += action.payload.price
    },
    removeOneProduct(state, action: PayloadAction<Iitem>) {
      state.cartItems = state.cartItems.map((e: Iitem) =>
        e.id === action.payload.id &&
        e.activeSize === action.payload.activeSize &&
        e.activeType === action.payload.activeType
          ? { ...e, count: e.count - 1 }
          : e
      )
      state.totalPrice -= action.payload.price
    },
    cleanCart(state) {
      state.cartItems = []
      state.totalPrice = 0
      delete localStorage.cartItems
      delete localStorage.totalPrice
    },
  },
})

export const {
  addProduct,
  removeProduct,
  cleanCart,
  addOneProduct,
  removeOneProduct,
} = cartSlice.actions

export default cartSlice.reducer
