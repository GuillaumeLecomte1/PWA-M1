import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

const ConnectionStatus = ({ isOnline }) => {
  return (
    <div>
      {isOnline ? (
        <p>Vous êtes en ligne <FontAwesomeIcon icon={faWifi} /></p>
      ) : (
        <p className="offline-icon">Vous êtes hors ligne <FontAwesomeIcon icon={faWifi} /></p>
      )}
    </div>
  );
};

export default ConnectionStatus;
