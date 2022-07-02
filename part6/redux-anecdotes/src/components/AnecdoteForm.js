import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  hideNotification,
} from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    console.log('content :>> ', content)
    dispatch(showNotification(`you created ${content}`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  )
}

export default NewAnecdote
