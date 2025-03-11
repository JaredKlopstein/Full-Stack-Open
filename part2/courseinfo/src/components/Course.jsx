const Header = ({course}) => <h1>{course}</h1>;

const Content = ({parts}) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({parts}) => (
  <b>
    Total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises
  </b>
);

const Course = ({courses}) => (
  <>
    {courses.map((course) => (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </>
);

export default Course;