import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        partyId: null,
        nickname: null,
        isHost: false,
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
        }
    },
})

export const { setPartyId, setNickname, setHost } = userSlice.actions

export default userSlice.reducer