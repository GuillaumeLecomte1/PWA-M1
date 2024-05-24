import React from 'react';
import { CCallout } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import logo from './logo.svg';
import './layout.css';


const Header = ({ position, isOnline, batteryLevel }) => {
  return (
    <header className="App-header">
      <h1>Test de PWA</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Cours de PWA en master 1</p>
      <br />

      <div className='geolocalisation'>
        {position && (
          <div>
            <h2>Position Géographique</h2>
            <p>Latitude : {position.latitude}</p>
            <p>Longitude : {position.longitude}</p>
          </div>
        )}
      </div>
      <br />

      {isOnline ? (
        <p>Vous êtes en ligne <FontAwesomeIcon icon={faWifi} /></p>
      ) : (
        <p className="offline-icon">Vous êtes hors ligne <FontAwesomeIcon icon={faWifi} /></p>
      )}
      <br />


      {batteryLevel !== null && (
        <div className="battery-status">
          <p>Niveau de batterie : {batteryLevel}%</p>
        </div>
      )}
<br />
      <button onClick={() => window.location.href = 'tel:+0637220574'}>Appeler</button>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
};

export default Header;
