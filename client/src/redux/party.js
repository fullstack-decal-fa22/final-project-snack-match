import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    restaurantList: null,
    partyHost: null,
    memberList: null,
    groupResults: null
};

export const partySlice = createSlice({
    name: 'party',
    initialState,
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
        },
        resetPartyState: (state) => {
            state = {...initialState}
        }
    },
})

export const { 
    setRestaurantList, 
    setMemberList,
    setGroupResults,
    setPartyHost,
    resetPartyState
} = partySlice.actions

export default partySlice.reducer