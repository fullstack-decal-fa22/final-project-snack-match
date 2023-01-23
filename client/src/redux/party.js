import { createSlice } from '@reduxjs/toolkit'

export const partySlice = createSlice({
    name: 'party',
    initialState: {
        restaurantList: null,
        partyHost: null,
        memberList: null,
        groupResults: null
    },
    reducers: {
        setRestaurantList: (state, action) => {
            state.restaurantList = action.payload;
        },
        setPartyHost: (state, action) => {
            state.partyHost = action.payload;
        },
        setMemberList: (state, action) => {
            state.memberList = action.payload;
        },
        setGroupResults: (state, action) => {
            state.groupResults = action.payload;
        }
    },
})

export const { 
    setRestaurantList, 
    setMemberList,
    setGroupResults,
    setPartyHost
} = partySlice.actions

export default partySlice.reducer