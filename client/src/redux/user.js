import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        partyId: null,
        nickname: null,
        isHost: false,
        voteCounter: {}
    },
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
        setVoteCounter: (state, action) => {
            state.voteCounter = action.payload
        },
        updateCount: (state, action) => {
            let id = action.payload.id
            let vote = action.payload.vote
            state.voteCounter[id] = vote
        }

    },
})

export const { setPartyId, setNickname, setHost, setVoteCounter, updateCount } = userSlice.actions

export default userSlice.reducer