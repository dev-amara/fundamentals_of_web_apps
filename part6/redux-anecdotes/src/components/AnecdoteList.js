import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const anecdotesByVotesDesc = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id, anecdotes) => {
    console.log("vote :", id);
    dispatch(voteAnecdote(id, anecdotes));
  };

  return (
    <>
      {anecdotesByVotesDesc.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdotes)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
