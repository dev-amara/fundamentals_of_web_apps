import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const anecdotesByVotesDesc = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id, anecdotes) => {
    console.log("vote :", id);
    const anecdote = anecdotes.filter(obj => obj.id ===id)[0]
    dispatch(voteAnecdote(id, anecdotes));
    const message = `You voted : ${anecdote.content}`;
    dispatch(notificationChange(message));
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, 5000)
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
