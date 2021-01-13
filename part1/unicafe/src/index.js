import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// a proper place to define a component
const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;

const Statistic = ({ text, value }) => {
    return (
        <p>
            {text} {value}
        </p>
    );
};

const Statistics = ({ result }) => {
    const { good, neutral, bad } = result;
    const total = good + neutral + bad;
    const positive = 100 * (good / total);
    const average = (good - bad) / total;

    if (total > 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <Statistic text="Good" value={good} />
                <Statistic text="Neutral" value={neutral} />
                <Statistic text="Bad" value={bad} />
                <Statistic text="All" value={total} />
                <Statistic text="Average" value={average} />
                <Statistic text="Positive" value={positive} />
            </div>
        );
    }
    return (
        <div>
            <h1>Statistics</h1>
            <p>No feedback given</p>
        </div>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleClickGood = () => setGood(good + 1);
    const handleClickNeutral = () => setNeutral(neutral + 1);
    const handleClickBad = () => setBad(bad + 1);

    const obj = {
        good: good,
        neutral: neutral,
        bad: bad
    }

    return (
        <div>
            <div>
                <h1>Give feed back</h1>
                <Button text="good" handleClick={handleClickGood} />
                <Button text="neutral" handleClick={handleClickNeutral} />
                <Button text="bad" handleClick={handleClickBad} />
            </div>
            <Statistics result={obj} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
