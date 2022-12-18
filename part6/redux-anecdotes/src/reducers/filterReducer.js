
export const filterInput = (input) => {
  if (input !== '') {
    return {
    type: 'INPUT',
    input
    }
  }
  else {
    return {
      type: '',
      input
    }
  }
}

const initialState = ''

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INPUT':
      return action.input
    case '':
      return initialState
    default:
      return state
  }
}

export default reducer