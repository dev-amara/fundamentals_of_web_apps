import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

    const randomAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length));
    };

    const pushVote = (selected) => {
        const newVotes = [...votes];
        newVotes[selected] += 1;
        setVotes(newVotes);
    };

    const mostVotes = Math.max(...votes);
    const voteCount = votes.indexOf(mostVotes);

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p> has {votes[selected]} votes</p>
            <button onClick={() => pushVote(selected)}>vote</button>
            <button onClick={randomAnecdote}>Next anecdote</button>

            <h1>Anecdote with most votes</h1>
            {mostVotes > 0 ? (
                <>
                    <p>{anecdotes[voteCount]}</p>
                    <p> has {votes[voteCount]} votes</p>
                </>
            ) : (
                <p>No anecdote has been voted on yet.</p>
            )}
        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
