import React, { useState, useEffect } from 'react';
import Header from './Header';
import './layout.css';

const HomePages = () => {
  const [position, setPosition] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(null);

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
        setIsCharging(battery.charging);

        const updateBatteryStatus = () => {
          setBatteryLevel(battery.level * 100);
          setIsCharging(battery.charging);
        };

        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);

        return () => {
          battery.removeEventListener('levelchange', updateBatteryStatus);
          battery.removeEventListener('chargingchange', updateBatteryStatus);
        };
      });
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Header
      position={position}
      isOnline={isOnline}
      batteryLevel={batteryLevel}
      isCharging={isCharging}
    />
  );
};

export default HomePages;
