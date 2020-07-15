import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const randomInt = () => Math.floor(Math.random() * props.anecdotes.length)
  const [selected, setSelected] = useState(() => randomInt())
  const [votes, setVotes] = useState((new Array(props.anecdotes.length).fill(0)))
  
  const randomAnecdote = () => {
    let i = randomInt()
    if (i === selected) i = randomInt() // to make sure won't show same anecdote twice in a row
    setSelected(i)
  }
  const voteAnecdote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    console.log('voted ' + selected + '. points now ' + copyVotes[selected])
    setVotes(copyVotes)
  }
  const mostVotes = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1> 
      <Display text={props.anecdotes[selected]} />
      <Display text={'has ' + votes[selected] + ' votes'} />
      <Button onClick={voteAnecdote} text='vote' />
      <Button onClick={randomAnecdote} text='next anecdote' />
      <h1>Anecdote with the most votes</h1> 
      <Display text={props.anecdotes[mostVotes]} />
    </div>
  )
}

const Display = ({text}) => <div>{text}</div>

const Button = ({onClick, text}) => (
  <button onClick={onClick}> {text}</button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)