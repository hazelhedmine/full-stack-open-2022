import { createSlice } from '@reduxjs/toolkit'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
}

const initialState = {
  message: null,
  style: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return {
        message: action.payload,
        style: style,
      }
    },
    hideNotification(state, action) {
      return initialState
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

// this method is for bug where timeout ends early when you spam it
let timeoutID

function setDelay(dispatch, time) {
  timeoutID = setTimeout(() => {
    dispatch(hideNotification())
  }, time)
}

function clearDelay() {
  clearTimeout(timeoutID)
}

export const setNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(showNotification(text))
    // const timeoutID = setTimeout(() => {
    //   dispatch(hideNotification())
    // }, time * 1000)
    clearDelay()
    setDelay(dispatch, time * 1000)
  }
}

export default notificationSlice.reducer
