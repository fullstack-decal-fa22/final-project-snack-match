import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    partyId: null,
    nickname: null,
    isHost: false,
    isConnected: false,
    voteCounter: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPartyId: (state, action) => {
            state.partyId = action.payload;
        },
        setNickname: (state, action) => {
            state.nickname = action.payload;
        },
        setHost: (state) => {
            state.isHost = true
        },
        setConnection: (state) => {
            state.isConnected = true
        },
        setVoteCounter: (state, action) => {
            state.voteCounter = action.payload
        },
        updateCount: (state, action) => {
            let id = action.payload.id
            let vote = action.payload.vote
            state.voteCounter[id] = vote
        },
        resetUserState: (state) => {
            state = initialState;
        }
    },
})

export const { 
    setPartyId, 
    setNickname, 
    setHost,
    setConnection,
    setVoteCounter, 
    updateCount,
    resetUserState 
} = userSlice.actions

export default userSlice.reducer