const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <b>Number of exercises {sum}</b>;

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

  let sum = 0;
  parts.map((part) => {
    sum += part.exercises;
  });

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

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
