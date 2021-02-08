import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const anecdotesByVotesDesc = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const anecdotesToShow = anecdotesByVotesDesc.filter((anecdote) => {
    if (filter === "") return true;

    return anecdote.content.toLowerCase().includes(filter.toLowerCase());
  });

  const vote = (id) => dispatch(voteAnecdote(id, anecdotes));

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

export default AnecdoteList;
