import React from 'react'

  
const Course = ({ courses }) => {
    return (
      <>
        {courses.map(course =>
            <div key={course.id}>
              <Header course={course} />
              <Content course={course} />
              <Total course={course} />
            </div>
          )}
      </>
    )
}

const Header = ({course}) => {
    console.log(course)        // nähdään missä muodossa propsit
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Content = ({course}) => {
    console.log(course.parts)
    return (
      <>
        {course.parts.map(part => 
        <Part key={part.id} part={part} />)}
      </>
    )
  }
  
  const Part = ({part}) => {
    console.log(part)
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Total = ({course}) => {
    const totalExcercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <h3>Total of {totalExcercises} exercises</h3>
    )
  }

  export default Course