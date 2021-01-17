import React from 'react';

const ErrorNotification = ({ message }) => {
    const display = () => {
        if (message!==null){
            return <div className="error">{message}</div>
        }
    }
    return <>{display()}</>;
};

export default ErrorNotification;
