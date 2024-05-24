import logo from './logo.svg';
import './App.css';
import { CCallout } from '@coreui/react';
import Webcam from 'react-webcam';
import React, { useState, useEffect, useRef } from 'react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GeolocationPage from './GeolocationPage'; // Un nouveau composant pour la page de géolocalisation
import CameraPage from './CameraPage'; // Un nouveau composant pour la page de la caméra
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

function App() {
  const webcamRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const images = JSON.parse(localStorage.getItem('capturedPhotos')) || [];
      images.push({ src: imageSrc, timestamp: new Date().toISOString(), synced: false });
      localStorage.setItem('capturedPhotos', JSON.stringify(images));
  
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Photo Capturée', {
          body: 'Votre photo a été capturée avec succès!',
          icon: imageSrc,
        });
        
        // Activer le mode vibreur
        if ('vibrate' in navigator) {
          navigator.vibrate(200); // Vibre pendant 200 ms
        }
      }
    }
  };
  
  const synchronizePhotos = () => {
    const images = JSON.parse(localStorage.getItem('capturedPhotos')) || [];
    const unsyncedImages = images.filter(image => !image.synced);
    
    if (unsyncedImages.length > 0) {
      // Simulez une synchronisation en marquant toutes les images comme synchronisées
      const updatedImages = images.map(image => ({ ...image, synced: true }));
      localStorage.setItem('capturedPhotos', JSON.stringify(updatedImages));
  
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Photos synchronisées', {
          body: `Vous avez synchronisé ${unsyncedImages.length} photos.`,
        });

        // Activer le mode vibreur
        if ('vibrate' in navigator) {
          navigator.vibrate(200); // Vibre pendant 200 ms
        }
      }
    }
  };

  React.useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);
  
  // Configurer les écouteurs pour détecter le changement de statut de connexion
  useEffect(() => {
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

  useEffect(() => {
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

  const handleCall = () => {
    window.location.href = 'tel:+1234567890'; // Remplacez par le numéro que vous souhaitez appeler
  };

  const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
      const storedImages = JSON.parse(localStorage.getItem('capturedPhotos')) || [];
      setImages(storedImages);
    }, []);

    return (
      <div className="gallery">
        {images.map((img, index) => (
          <div key={index}>
            <img src={img.src} alt={`Captured ${index}`} style={{ width: '100px', height: '100px', margin: '10px' }} />
            <p>{img.synced ? "Synchronisée" : "Non synchronisée"}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <Router>
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item"><Link to="/">Accueil</Link></li>
            <li className="nav-item"><Link to="/geolocalisation">Géolocalisation</Link></li>
            <li className="nav-item"><Link to="/camera">Camera</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/geolocalisation" element={<GeolocationPage />} />
          <Route path="/camera" element={<CameraPage />} />
        </Routes>
      </Router>

      <header className="App-header">
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg" />
          <br />
          <button onClick={capture}>Capture Photo</button>
        </div>

        <div className="captured-photo">
          {localStorage.getItem('capturedPhoto') && (
            <img src={localStorage.getItem('capturedPhoto')} alt="Captured" />
          )}
        </div>
        <Gallery />

        <h1>Test de PWA</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Cours de PWA en master 1 
        </p>

        <hr className="h-px my-8 bg-red-800 border-0 dark:bg-gray-700"></hr>

        <div className='geolocalisation'>
          {position && (
            <div>
              <h2>Position Géographique</h2>
              <p>Latitude : {position.latitude}</p>
              <p>Longitude : {position.longitude}</p>
            </div>
          )}
        </div>

        <hr className="h-px my-8 bg-green-400 border-0 dark:bg-gr-700"></hr>

        {isOnline ? (
          <p>Vous êtes en ligne <FontAwesomeIcon icon={faWifi} /></p>
        ) : (
          <p className="offline-icon">Vous êtes hors ligne <FontAwesomeIcon icon={faWifi} /></p>
        )}

        {batteryLevel !== null && (
          <div className="battery-status">
            <p>Niveau de batterie : {batteryLevel}%</p>
          </div>
        )}

        <CCallout color="success">
          Cours de PWA en master 1 
        </CCallout>
        <button onClick={handleCall}>Appeler</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
