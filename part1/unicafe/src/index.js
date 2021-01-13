import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// a proper place to define a component
const Statistics = (props) => {
    const {good, neutral, bad} =props;
    const total = good+neutral+bad;
    const positive = 100*(good/total);
    const average = (good-bad)/total;
    
    return (
        <div>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>neutral {bad}</p>
            <p>all {total}</p>
            <p>average {average}</p>
            <p>positive {positive} %</p>
        </div>
    );
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleClickGood = () => setGood(good + 1);
    const handleClickNeutral = () => setNeutral(neutral + 1);
    const handleClickBad = () => setBad(bad + 1);

    return (
        <div>
            <div>
                <h1>give feed back</h1>
                <button onClick={handleClickGood}>good</button>
                <button onClick={handleClickNeutral}>neutral</button>
                <button onClick={handleClickBad}>bad</button>
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
