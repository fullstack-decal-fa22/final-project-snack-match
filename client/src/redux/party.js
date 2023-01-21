import { createSlice } from '@reduxjs/toolkit'

export const partySlice = createSlice({
    name: 'party',
    initialState: {
        restaurantList: null,
        partyMembers: null,
        groupResults: null
    },
    reducers: {
        setRestaurantList: (state, action) => {
            state.restaurantList = action.payload;
        },
        setPartyMembers: (state, action) => {
            state.partyMembers = action.payload;
        },
        setGroupResults: (state, action) => {
            state.groupResults = action.payload;
        }
    },
})

export const { 
    setRestaurantList, 
    setPartyMembers,
    setGroupResults
} = partySlice.actions

export default partySlice.reducer