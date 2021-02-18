import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BORN } from "../queries";
import Select from "react-select";

const Authors = ({ show, authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState('');

  const selectOptions = authors.map((a) => ({ value: a.name, label: a.name}));

  const [changeBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  const handleSelect = (event) => setName(event.value);

  const updateAuthor = async (event) => {
    event.preventDefault();
    await changeBorn({ variables: { name, born } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          <label>name:</label>
          {/*<input*/}
          {/*  value={name}*/}
          {/*  onChange={({ target }) => setName(target.value)}*/}
          {/*/>*/}
          <Select options={selectOptions} onChange={handleSelect}/>
        </div>
        <div>
          <label>born:</label>
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
