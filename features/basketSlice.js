import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  //Reducers are the action that allow us to modify the data in the store
  reducers: {
    addToBasket: (state, action) => {
      //the state.items mean to keep whatever is in the basket and actionpayload means just add to it
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(
          `Cant remove product`
        )
      }

      state.items = newBasket;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket} = basketSlice.actions

export const selectBasketItems = state => state.basket.items;

export const selectBasketItemsWithId = (state, id) => 
        state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => total += item.price, 0)

export default basketSlice.reducer