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

const App = () => {
    // const-definitions
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
