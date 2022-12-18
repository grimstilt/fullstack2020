import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = asObject(event.target.anecdote.value)
    event.target.anecdote.value = ''
    props.createAnecdote(anecdote)
    props.createNotification(anecdote.content, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote, createNotification
}

const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedForm