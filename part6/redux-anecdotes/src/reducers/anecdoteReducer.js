import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   // const content = action.payload
    //   // state.push(asObject(content))

    //   // since id is generated by backemd
    //   state.push(action.payload)
    // },
    // voteAnecdote(state, action) {
    //   const id = action.payload
    //   const anecdoteToChange = state.find((n) => n.id === id)
    //   // create a copy of the original note with modifications
    //   const changedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1,
    //   }
    //   // return new state by replacing old note
    //   return state.map((anecdote) =>
    //     anecdote.id !== id ? anecdote : changedAnecdote
    //   )
    // },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case 'VOTE':
//       const id = action.data.id
//       const anecdoteToChange = state.find((n) => n.id === id)
//       // create a copy of the original note with modifications
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1,
//       }
//       // return new state by replacing old note
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : changedAnecdote
//       )
//     case 'NEW_ANECDOTE':
//       return state.concat(action.data)
//     default:
//       return state
//   }
// }

// export const createAnecdote = (anecdote) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: asObject(anecdote),
//   }
// }

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id },
//   }
// }

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find((n) => n.id === id)
    const changedAnecdote = await anecdoteService.voteAnecdote(
      id,
      anecdoteToChange
    )
    const changedAnecdotes = anecdotes.map((anecdote) =>
      anecdote.id !== id ? anecdote : changedAnecdote
    )
    dispatch(setAnecdotes(changedAnecdotes))
  }
}

export default anecdoteSlice.reducer
