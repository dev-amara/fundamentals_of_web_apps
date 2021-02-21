import React, { useEffect, useState } from "react";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";

const Books = ({ show }) => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState(null);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      setBooks(books.concat(subscriptionData.data.bookAdded));
      window.alert('state has been updated')
    },
  });

  const [getAllBooks, getAllBooksResults] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    getAllBooks({ variables: { genre } });
  }, [genre, getAllBooks]);

  useEffect(() => {
    const { called, data, networkStatus } = getAllBooksResults;
    if (called && networkStatus > 6) {
      const newBook = data ? data.allBooks : [];
      setBooks(newBook);
    }
  }, [getAllBooksResults]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre("refactoring")}>refactoring</button>
        <button onClick={() => setGenre("agile")}>agile</button>
        <button onClick={() => setGenre("patterns")}>patterns</button>
        <button onClick={() => setGenre("design")}>design</button>
        <button onClick={() => setGenre("crime")}>crime</button>
        <button onClick={() => setGenre("classic")}>classic</button>
        <button onClick={() => setGenre("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
