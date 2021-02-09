import React from "react";
import { connect } from "react-redux";

const Notification = ({ notificationsToShow }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div style={style}>
      {notificationsToShow.map((notification) => (
        <div key={notification.id}>{notification.message}</div>
      ))}
    </div>
  );
};

const notificationsToShow = (notifications) => {
  if (notifications.length <= 3) {
    return notifications;
  } else {
    const notificationsByDateDesc = [...notifications].sort(
      (a, b) => b.date - a.date
    );

    const lastThreeNotifications = notificationsByDateDesc
      .slice(0, 3)
      .reverse();

    return lastThreeNotifications;
  }
};

const mapStateToProps = (state) => {
  return { notificationsToShow: notificationsToShow(state.notifications) };
};

export default connect(mapStateToProps)(Notification);
