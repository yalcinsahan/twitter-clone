import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    leftbar: false,
    rightbar: false,
    bottombar: false
}

export const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        changeLeft: (state, action) => {
            state.leftbar = action.payload
        },
        changeRight: (state, action) => {
            state.rightbar = action.payload
        },
        changeBottom: (state, action) => {
            state.bottombar = action.payload
        },
    },
})

export const { changeLeft, changeRight, changeBottom } = displaySlice.actions
export default displaySlice.reducer