import React from 'react'

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
            <Total parts={parts} />
        </div>
    )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
 

const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises);
    const total = exercises.reduce((accumulator, currentVal) => accumulator + currentVal)

    return (
        <div>
            <h3>Total of {total} exercises</h3>
        </div>
    )
}

const Course = ({ course }) => {
    return (
    <div>
        <h1>{course.name}</h1>
        <Content parts={course.parts} />
    </div>
    )
    
}


export default Course