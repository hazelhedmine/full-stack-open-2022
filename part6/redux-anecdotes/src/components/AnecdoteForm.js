// import { useDispatch } from 'react-redux'
// import { createAnecdote } from '../reducers/anecdoteReducer'
// import { setNotification } from '../reducers/notificationReducer'

// const NewAnecdote = () => {
//   const dispatch = useDispatch()

//   const addAnecdote = async (event) => {
//     event.preventDefault()
//     const content = event.target.anecdote.value
//     console.log('content :>> ', content)
//     event.target.anecdote.value = ''
//     dispatch(createAnecdote(content))

//     // dispatch(showNotification(`you created ${content}`))
//     // setTimeout(() => {
//     //   dispatch(hideNotification())
//     // }, 5000)

//     dispatch(setNotification(`you created '${content}'`, 5))
//   }

//   return (
//     <form onSubmit={addAnecdote}>
//       <div>
//         <input name="anecdote" />
//       </div>
//       <button>create</button>
//     </form>
//   )
// }

// export default NewAnecdote

import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('content :>> ', content)
    event.target.anecdote.value = ''
    props.createAnecdote(content)

    props.setNotification(`you created '${content}'`, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(NewAnecdote)
export default ConnectedAnecdoteForm
