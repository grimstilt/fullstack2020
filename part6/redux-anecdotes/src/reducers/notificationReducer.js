let timeoutID
export const createNotification = (anecdote, t) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE',
      message: `you created '${anecdote}'`
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch(clearNotification()), t * 1000)
  }
}

export const voteNotification = (anecdote, t) => {
  return async dispatch => {
    dispatch({
      type: 'VOTED',
      message: `you voted '${anecdote}'`
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch(clearNotification()), t * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'NULL',
    message: ''
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CREATE':
      return action.message
    case 'VOTED':
      return action.message
    case 'NULL':
      return action.message
    default:
      return state
  }
}

export default reducer