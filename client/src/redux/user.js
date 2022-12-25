import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        partyId: null,
        nickname: null,
    },
    reducers: {
        setPartyId: (state, action) => {
            state.partyId = action.payload;
        },
        setNickname: (state, action) => {
            state.nickname = action.payload;
        }
    },
})

export const { setPartyId, setNickname } = userSlice.actions

export default userSlice.reducer