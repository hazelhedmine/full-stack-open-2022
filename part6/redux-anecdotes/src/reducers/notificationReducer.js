import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: 'initial notification',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      const content = action.payload
      const changedNotification = {
        message: content,
      }
      return changedNotification
    },
  },
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer
