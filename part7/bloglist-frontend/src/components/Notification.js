import React from "react";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";

const Notification = ({ notificationsToShow }) => {
    return (
        <div>
            {notificationsToShow.map((notification) => (
                <Alert key={notification.id} severity={notification.level}>
                    {notification.message}
                </Alert>
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

    return notificationsByDateDesc
        .slice(0, 3)
        .reverse();
  }
};

const mapStateToProps = (state) => {
  return { notificationsToShow: notificationsToShow(state.notifications) };
};

export default connect(mapStateToProps)(Notification);
