import React from 'react';
import './NotificationPage.css'; // Importer le fichier CSS

class NotificationPage extends React.Component {
  // Fonction pour afficher une notification
  showNotification = () => {
    // Vérifier si les notifications sont prises en charge par le navigateur
    if (!("Notification" in window)) {
      alert("Ce navigateur ne supporte pas les notifications de bureau.");
    } else if (Notification.permission === "granted") {
      // Si les notifications sont autorisées, afficher une notification
      new Notification("Salut! Voici une notification.");
    } else if (Notification.permission !== "denied") {
      // Demander la permission de montrer des notifications
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Salut! Voici une notification.");
        }
      }).catch(error => {
        console.error("Erreur lors de la demande de permission de notification :", error);
      });
    }
  };

  // Fonction pour faire vibrer le téléphone
  vibratePhone = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(200); // Vibrer pendant 200 millisecondes
    } else {
      alert("Ce navigateur ne supporte pas l'API Vibration.");
    }
  };

  // Fonction pour afficher une notification et faire vibrer le téléphone
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
