import React from "react";

const SuccessNotification = ({ message }) => {
  const display = () => {
    if (message !== null) {
      return <div className="success">{message}</div>;
    }
  };
  return <>{display()}</>;
};

export default SuccessNotification;
