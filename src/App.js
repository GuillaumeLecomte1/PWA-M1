import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import GeolocationPage from './GeolocationPage'; // Un nouveau composant pour la page de géolocalisation
import CameraPage from './CameraPage'; // Un nouveau composant pour la page de la caméra
import HomePages from './HomePages'; // Page d'accueil
// import HomePage2 from './HomePage2'; // Page d'accueil
import NotificationPage from './NotificationPage'; // Page de notification
import TelephonePage from './TelephonePage';
import OtpPage from './OtpPage';
import './App.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

serviceWorkerRegistration.register();

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState(null);

  const synchronizePhotos = () => {
    const images = JSON.parse(localStorage.getItem('capturedPhotos')) || [];
    const unsyncedImages = images.filter(image => !image.synced);
    
    if (unsyncedImages.length > 0) {
      const updatedImages = images.map(image => ({ ...image, synced: true }));
      localStorage.setItem('capturedPhotos', JSON.stringify(updatedImages));
  
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Photos synchronisées', {
          body: `Vous avez synchronisé ${unsyncedImages.length} photos.`,
        });

        if ('vibrate' in navigator) {
          navigator.vibrate(200); // Vibre pendant 200 ms
        }
      }
    }
  };

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        setBatteryLevel(battery.level * 100);

        const updateBatteryLevel = () => {
          setBatteryLevel(battery.level * 100);
        };

        battery.addEventListener('levelchange', updateBatteryLevel);

        return () => {
          battery.removeEventListener('levelchange', updateBatteryLevel);
        };
      });
    }

    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        synchronizePhotos();
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/geolocalisation" element={<GeolocationPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/telephone" element={<TelephonePage />} /> 
          <Route path="/notification" element={<NotificationPage />} /> 
          <Route path="/sms" element={<OtpPage />} /> 

        </Routes>
      </Router>
    </div>
  );
}

export default App;
