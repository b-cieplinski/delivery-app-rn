import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
  },
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  //Reducers are the action that allow us to modify the data in the store
  reducers: {
    setRestaurant: (state, action) => {
        state.restaurant = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions

export const selectRestaurant = state => state.basket.items;

export default restaurantSlice.reducer