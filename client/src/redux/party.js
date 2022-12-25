import { createSlice } from '@reduxjs/toolkit'

export const partySlice = createSlice({
    name: 'party',
    initialState: {
        restaurantList: null,
    },
    reducers: {
        setRestaurantList: (state, action) => {
            state.restaurantList = action.payload;
        },
    },
})

export const { setRestaurantList } = partySlice.actions

export default partySlice.reducer