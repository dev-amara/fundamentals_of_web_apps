import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    console.log('props',props)
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
    return (
        <div>
            <Part name={props.part1} number_exercises={props.exercises1} />
            <Part name={props.part2} number_exercises={props.exercises2} />
            <Part name={props.part3} number_exercises={props.exercises3} />
        </div>
    );
};

const Total = (props) => {
    return <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>;
};

const App = () => {
    // const-definitions
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content
                part1={part1.name}
                part2={part2.name}
                part3={part3.name}
                exercises1={part1.exercises}
                exercises2={part2.exercises}
                exercises3={part3.exercises}
            />
            <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
