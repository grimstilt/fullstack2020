import anecdoteService from '../services/anecdotes'

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const voteChange = (changedAnecdote) => {
  return async dispatch => {
    await anecdoteService.update(changedAnecdote)
    dispatch ({
      type: 'VOTE',
      data: { changedAnecdote }
  })
}
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
} 

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.changedAnecdote.id
      return state.map(anecdote => anecdote.id === id ? action.data.changedAnecdote : anecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default reducer