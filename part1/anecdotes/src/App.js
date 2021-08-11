import React, { useState } from 'react'

const Button = ({ handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Max = ({ votes, anecdotes }) => {
  const hig = votes.Max
  console.log('Hello');
  const maximum = Math.max(...votes)
  const i = votes.indexOf(maximum)
  return (
    <>
      {anecdotes[i]} <br/> has {maximum} votes
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(7).fill(0))

  const handleNext = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} <br/> has {votes[selected]} votes. <br/>
      <Button handleClick={handleNext} text='Next anecdote' />
      <Button handleClick={handleVote} text='Vote' />
      <h2>Anecdote with most votes</h2>
      <Max votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App;
