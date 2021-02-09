import React from "react";
import { connect} from "react-redux";
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ anecdotesToShow, voteForAnecdote }) => {

  const vote = (id) => (voteForAnecdote(id));

  return (
    <>
      {anecdotesToShow.map((anecdote, index) => (
        <div key={index}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  const { anecdotes, filter } = state;
  const anecdotesByVotesDesc = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const anecdotesToShow = anecdotesByVotesDesc.filter((a) => {
    if (filter === "") return true;
    return a.content.toLowerCase().includes(filter.toLowerCase());
  });

  return { anecdotesToShow };
};

export default connect(mapStateToProps, { voteForAnecdote })(AnecdoteList);
