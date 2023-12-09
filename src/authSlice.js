import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
    name: 'auth',
    initialState: { token: undefined, refresh_token: undefined },
    reducers: {
        addToken: (state, action) => {
            // console.log('updating ',action)
            state.token = action.payload
        },
        removeToken: (state, action) => {
            state.token = ''
        }
    }
})

export const { addToken,removeToken } = auth.actions
export default auth.reducer;