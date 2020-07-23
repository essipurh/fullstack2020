import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

// not sure if it was wanted to have App also as a separate component, and the courses list separated from the App cpmponent
// deicded to do it like this, because it was cleaner/easier to add new test courses and parts etc

const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts:  [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Test course',
        exercises: 15,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  },
  {
    name: 'Node2.js',
    id: 3,
    parts: [
      {
        name: 'Fun',
        exercises: 4,
        id: 1
      },
      {
        name: 'Funnier',
        exercises: 6,
        id: 2
      },
      {
        name: 'Funniest Functions',
        exercises: 10,
        id: 3
      },
    ]
  }
]

ReactDOM.render(<App courses={courses} />, document.getElementById('root'))