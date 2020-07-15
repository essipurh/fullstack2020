import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const H1Titels = ( {title} ) => <h1>{title}</h1>

const Button = ({onClick, text}) => (
  <button onClick={onClick}> {text}</button>
)

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} </td>
    </tr>
  )
}

// arrayClicks: index 0 = object good, index 1 =object neutral, index 2 = object bad, index 3= object all
const Statistics = ({arrayClicks}) => {
  if (arrayClicks[3].value === 0) return (<div>No feedback given</div>)

  // setting texts and values for good, neutral and bad
  const goodText = arrayClicks[0].text; const good = arrayClicks[0].value
  const neutraltext = arrayClicks[1].text; const neutral = arrayClicks[1].value
  const badText = arrayClicks[2].text; const bad = arrayClicks[2].value
  const allText = arrayClicks[3].text; const all = arrayClicks[3].value

  return (
    <table>
      <tbody>
        <StatisticsLine text={goodText} value={good} />
        <StatisticsLine text={neutraltext} value={neutral} />
        <StatisticsLine text={badText} value={bad} />
        <StatisticsLine text={allText} value={all} />
        <StatisticsLine text='average' value={weightedAverage(good, neutral,bad,all)} />
        <StatisticsLine text='positive' value={percentage(good, all)} />
      </tbody>
    </table>
  )
}

//functions to calculate averages, percetanges and rounding up
// weights: w1, w2, w3
const weightedAverage = (good, neutral, bad, all) => {
  const w1 = 1; const w2 = 0; const w3= -1
  if (all === 0 ) return 0
  return roundUp((w1*good + w2*neutral + w3*bad)/all)
}

const percentage = (value, all) => {
  if (all === 0) return 0
  return (roundUp(value/all)*100 + '%') // shouldn't use " + '%' ", but comma ( , '%') didn't work.
}

const roundUp = (number) => {
  return Math.round((number + Number.EPSILON) * 10000) /10000 
}

// The actual App
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const arrayClicks = [{ text: 'good', value:good,}, 
                      {text: 'neutral', value:neutral}, 
                      {text:'bad', value: bad}, 
                      {text: 'all', value: good+neutral+bad}]
  //console.log(arrayClicks)

  return (
    <div>
     <H1Titels title='Give Feedback' />
     <Button onClick={() => setGood(good + 1)} text='good' />
     <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
     <Button onClick={() => setBad(bad + 1)} text='bad' />
     <H1Titels title='Statistics' />
     <Statistics arrayClicks={arrayClicks} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
