import React, { useState, useEffect } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";
import { ALL_PERSONS, PERSON_ADDED } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  const updateCacheWith = (addedPerson) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_PERSONS });
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addedPerson) },
      });
    }
  };

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded;
      notify(`${addedPerson.name} added`);
      updateCacheWith(addedPerson);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("phonenumbers-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} updateCacheWith={updateCacheWith} />
      <PhoneForm notify={notify} />
    </div>
  );
};

export default App;
