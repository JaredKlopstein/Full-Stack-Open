const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
  <>
    {props.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => (
  <b>
    Total of {props.parts.reduce((acc, part) => acc + part.exercises, 0)} exercises
  </b>
);

const Course = (props) => (
  <>
  <Header course={props.course.name} />
  <Content parts={props.course.parts} />
  <Total parts={props.course.parts} />
  </>
);


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
