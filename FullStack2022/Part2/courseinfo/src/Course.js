import React from "react";

const Total = ({ parts }) => {
    const sum = parts.reduce((s, p) => {return {exercises: s.exercises + p.exercises}});
    return (
      <p>
        <b>Total of {sum.exercises} exercises </b>
      </p>
    );
  };
  
const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}
const Content = ({parts}) => {
    return(
        <div>
            {parts.map(part=> (
                <Part key={part.id} part={part}/>
            ))}
        </div>
    )
}

const Part = (props) => {
    return(
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

  const Course = ({courses}) => {
    return (
    <>
    {courses.map(course => {
    return (
    <div key={course.id}>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
    );
    })}
    </>
    )
  }



export default Course