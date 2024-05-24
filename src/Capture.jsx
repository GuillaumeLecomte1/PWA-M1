import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import './Capture.css'; // Assurez-vous de créer ce fichier CSS

const Capture = ({ webcamRef }) => {
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

        if ('vibrate' in navigator) {
          navigator.vibrate(200);
        }
      }
    }
  };

  return (
    <div className="capture-container">
      <div className="webcam-wrapper">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      </div>
      <button className="capture-button" onClick={capture}>Capture Photo</button>
    </div>
  );
};

export default Capture;
