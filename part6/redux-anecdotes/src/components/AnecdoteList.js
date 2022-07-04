import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Notes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))

    const anecdoteToVote = anecdotes.find((n) => n.id === id)
    console.log('anecdoteToVote :>> ', anecdoteToVote)
    // dispatch(showNotification(`you voted for '${anecdoteToVote.content}'`))
    // setTimeout(() => {
    //   dispatch(hideNotification())
    // }, 5000)
    dispatch(setNotification(`you voted '${anecdoteToVote.content}'`, 5))
  }

  // array (anecdotes) is frozen to prevent mutation of redux state,
  // hence need to create a copy to mutate it
  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Notes
