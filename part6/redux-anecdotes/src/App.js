import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
// import AnecdoteForm from './components/AnecdoteForm'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
// import Notification from './components/Notification'
import ConnectedNotification from './components/Notification'
// import Filter from './components/Filter'
import ConnectedFilter from './components/Filter'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <ConnectedNotification></ConnectedNotification>
      <h2>Anecdotes</h2>
      <ConnectedFilter></ConnectedFilter>
      <AnecdoteList></AnecdoteList>
      <h2>create new</h2>
      <ConnectedAnecdoteForm></ConnectedAnecdoteForm>
    </div>
  )
}

export default App
