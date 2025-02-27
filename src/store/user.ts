import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface UserState {
  token: string | null
}

const initialState: UserState = {
  token: null
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = "123123123123"
    },
    logout: (state) => {
      state.token = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = slice.actions

export default slice.reducer