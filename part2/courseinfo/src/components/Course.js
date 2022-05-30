import React from "react";

const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <b>total of {sum} exercises</b>;

const Part = ({ part }) => {
  console.log("part :>> ", part);
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  console.log("parts :>> ", parts);

  const sum = parts.reduce((previousValue, currentValue) => {
    console.log("sum :>> ", previousValue, currentValue);
    /*
     * the below code gives error cause from the 2nd iteration onwards
     * previousValue is a number, so .exercises gives nothing
     * hence it will return NaN
     * instead, should initialise an initial number (0 in this case)
     * and change previousValue to be a number
     */
    //return previousValue.exercises + currentValue.exercises;

    return previousValue + currentValue.exercises;
  }, 0);

  console.log("final sum :>> ", sum);

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
      <Total sum={sum}></Total>
    </>
  );
};

const Course = ({ course }) => {
  console.log("course :>> ", course);

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
    </div>
  );
};

export default Course;
