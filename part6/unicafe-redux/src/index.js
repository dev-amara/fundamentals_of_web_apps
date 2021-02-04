import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const action = (type) => {
    return () => {
      store.dispatch({
        type,
      });
    };
  };

  return (
    <>
        <div>
          <h1>Give Feedback</h1>
          <div>
            <button onClick={action("GOOD")}>good</button>
            <button onClick={action("OK")}>neutral</button>
            <button onClick={action("BAD")}>bad</button>
            <button onClick={action("ZERO")}>reset stats</button>
          </div>
        </div>
        <div>
          <h1>Statistics</h1>
          <p>Good {store.getState().good}</p>
          <p>Neutral {store.getState().ok}</p>
          <p>Bad {store.getState().bad}</p>
        </div>
    </>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
