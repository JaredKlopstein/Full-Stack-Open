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
    {props.courses.map((course) => (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </>
);

export default Course;