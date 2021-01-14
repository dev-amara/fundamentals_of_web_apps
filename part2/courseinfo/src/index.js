import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return <h2>{props.course}</h2>;
};

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((value, index) => {
                return <Part key={index} name={value.name} number_exercises={value.exercises} />;
            })}
        </div>
    );
};

const Total = ({ parts }) => {
    const sum = parts.reduce(function (sum, part) {
        return sum + part.exercises;
    }, 0);
    return (
        <p>
            <b>Total of {sum} exercises</b>
        </p>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1,
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2,
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3,
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1,
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    const show = () =>
        courses.map((course) => (
            <div key={course.id}>
                <Course course={course} />
            </div>
        ));

    return <div>{show()}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
