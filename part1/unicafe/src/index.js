import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
  
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
            <Statistic text='good' value={props.good} />
            <Statistic text='bad' value={props.bad} />
            <Statistic text='neutral' value={props.neutral} />
            <Statistic text='all' value={props.all} />
            <Statistic text='average' value={props.average }/>
            <Statistic text='positive' value={props.positive + ' %'} />
      </tbody>
    </table>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const average = (good - bad) / (all)
  const positive = (good / all) * 100

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)    
  }
  
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }
  
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive = {positive} />      
    </div>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
