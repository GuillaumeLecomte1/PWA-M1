import React from 'react';
import './NotificationPage.css';

class NotificationPage extends React.Component {
  showNotification = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      alert("Service worker not registered");
      return;
    }

    if (!("Notification" in window)) {
      alert("Ce navigateur ne supporte pas les notifications de bureau.");
    } else if (Notification.permission === "granted") {
      registration.showNotification("Salut! Voici une notification.");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          registration.showNotification("Salut! Voici une notification.");
        }
      }).catch(error => {
        console.error("Erreur lors de la demande de permission de notification :", error);
      });
    }
  };

  vibratePhone = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(200);
    } else {
      alert("Ce navigateur ne supporte pas l'API Vibration.");
    }
  };

  showNotificationAndVibrate = () => {
    this.showNotification();
    this.vibratePhone();
  };

  render() {
    return (
      <div className="notification-container">
        <h1>Notifications et Vibration</h1>
        <button onClick={this.showNotification}>
          Montrer Notification
        </button>
        <button onClick={this.vibratePhone}>
          Faire Vibrer le Téléphone
        </button>
        <button onClick={this.showNotificationAndVibrate}>
          Notification + Vibration
        </button>
      </div>
    );
  }
}

export default NotificationPage;
