import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icon issue in Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const GeolocationPage = () => {
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    const getPosition = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = position.coords;
            setPosition([coords.latitude, coords.longitude]);
            getCityName(coords.latitude, coords.longitude);
          },
          (error) => {
            console.error('Erreur lors de la récupération de la position : ', error);
          }
        );
      } else {
        console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
      }
    };

    const getCityName = async (lat, lng) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        if (data && data.address) {
          setCity(data.address.city || data.address.town || data.address.village || '');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du nom de la ville : ', error);
      }
    };

    getPosition();
  }, []);

  return (
    <div>
      {position ? (
        <div>
          <h2>Position Géographique</h2>
          <p>Latitude : {position[0]}</p>
          <p>Longitude : {position[1]}</p>
          <p>Ville : {city}</p>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Vous êtes ici : {city}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p>Obtention de la position...</p>
      )}
    </div>
  );
};

export default GeolocationPage;
