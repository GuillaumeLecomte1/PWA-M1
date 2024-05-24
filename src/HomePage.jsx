import React, { useState, useEffect } from 'react';
import Header from './Header';
import './layout.css';

const HomePage = () => {
  const [position, setPosition] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    const getPosition = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition(position.coords);
          },
          (error) => {
            console.error('Erreur lors de la récupération de la position : ', error);
          }
        );
      } else {
        console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
      }
    };

    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    getPosition();

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
  }, []);

  return (
    <Header
      position={position}
      isOnline={isOnline}
      batteryLevel={batteryLevel}
    />
  );
};

export default HomePage;