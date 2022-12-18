import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value.toPrecision(2)}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.ok === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <table>
        <tbody>
          <Statistic text='Good' value={props.good} />
          <Statistic text='Neutral' value={props.ok} />
          <Statistic text='Bad' value={props.bad} />
          <Statistic text='All' value={props.good + props.bad + props.ok} />
          <Statistic text='Average' value={(props.good - props.bad)/(props.good + props.bad + props.ok)} />
          <Statistic text='Positive %' value={props.good/(props.good + props.bad + props.ok)} />
        </tbody>
      </table>
    )
  }

}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <h2>Statistics</h2>
      <Statistics good={store.getState().good} ok={store.getState().ok} bad={store.getState().bad} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
