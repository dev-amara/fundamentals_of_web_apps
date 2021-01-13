import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Part = (props) => {
    return (
        <p>
            {props.name} {props.number_exercises}
        </p>
    );
};

const Content = (props) => {
    const { parts } = props;
    return (
        <div>
            {parts.map((value, index) => {
                return <Part key={index} name={value.name} number_exercises={value.exercises} />;
            })}
        </div>
    );
};

const Total = (props) => {
    const { parts } = props;
    const sum = parts.reduce(function (sum, current) {
        return sum + current.exercises;
    }, 0);
    return <p>Number of exercises {sum}</p>;
};

const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    );
};

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
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
        ],
    };

    return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
