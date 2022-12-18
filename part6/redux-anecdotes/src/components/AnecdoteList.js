import { useSelector, useDispatch } from 'react-redux'
import { voteChange } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    dispatch(voteChange(changedAnecdote))
    dispatch(voteNotification(anecdote.content, 5))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => a.votes - b.votes).filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList