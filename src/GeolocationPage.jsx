import React, { useState, useEffect } from 'react';

function GeolocationPage() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h1>Position Géographique</h1>
      {position ? (
        <div>
          <p>Latitude : {position.latitude}</p>
          <p>Longitude : {position.longitude}</p>
        </div>
      ) : (
        <p>Chargement de la position...</p>
      )}
    </div>
  );
}

export default GeolocationPage;
