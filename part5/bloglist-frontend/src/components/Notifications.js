import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div id="error" className="error">{message}</div>
}

export default Notification
