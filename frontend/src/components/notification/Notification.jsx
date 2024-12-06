import React, { useState } from "react";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You have received a new resource request." },
    { id: 2, message: "Your donation has been successfully shared." },
    { id: 3, message: "A new message from the community." },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNotificationPopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-container">
      <button className="notification-icon" onClick={toggleNotificationPopup}>
        <i className="fa fa-bell"></i>
      </button>

      {isOpen && (
        <div className="notification-popup">
          <h4>Notifications</h4>
          <ul className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification.id} className="notification-item">
                  {notification.message}
                </li>
              ))
            ) : (
              <li className="notification-item">No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
