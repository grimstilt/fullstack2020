import React, { useState } from "react"

const Button = ({ handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
}

const Statistics = (props) => {
  if (props.all > 0) {
  return (
    <table>
      <tbody>
        <Statistic text='Good' value={props.good} />
        <Statistic text='Neutral' value={props.neutral} />
        <Statistic text='Bad' value={props.bad} />
        <Statistic text='All' value={props.all} />
        <Statistic text='Average' value={props.average} />
        <Statistic text='Positive' value={props.positive + ' %'} />
      </tbody>
    </table>    
  )
  } else {
    return (
      <div>No feedback given</div>
    )
  }

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => setGood(good + 1)
  const handleBad = () => setBad(bad + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  
  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={handleGood} text='Good' />
      <Button handleClick={handleNeutral} text='Neutral' />
      <Button handleClick={handleBad} text='Bad' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} 
      average={(good - bad) / (good+neutral+bad)} 
      positive={(good / (good+neutral+bad)) * 100} 
      all={good + neutral + bad} />
    </div>
  )

}

export default App;
