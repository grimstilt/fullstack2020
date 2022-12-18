import React from 'react'

const Notification = ({ message, errorMessage }) => {
  const messageStyle = {
    color: 'green',
    background: 'grey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const errorMessageStyle = {
    color: 'red',
    background: 'grey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (errorMessage === null & message === null) {
    return null
  } else if (errorMessage === null) {
    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
  } else {
    return (
      <div id='error' style={errorMessageStyle}>
        {errorMessage}
      </div>
    )
  }

}

export default Notification