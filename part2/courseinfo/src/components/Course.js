import React from 'react';

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

export default Course
