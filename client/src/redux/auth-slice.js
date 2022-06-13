import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from "../services/auth-service";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const login = createAsyncThunk('auth/login', async (user) => {
    const response = await authService.login(user)

    return response
})

export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        refreshUser: (state, action) => {
            state.user = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })

    }
})

export const { reset, refreshUser } = authSlice.actions
export default authSlice.reducer