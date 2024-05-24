import React, { useRef } from 'react';
import Navbar from './Navbar';
import Webcam from 'react-webcam';
import Gallery from './Gallery';
import './CameraPage.css'; // Assurez-vous de créer ce fichier CSS

const CameraPage = () => {
  const webcamRef = useRef(null);

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
    <div className="camera-page-container">
      <h2>Module Camera</h2>
      <div className="webcam-wrapper">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      </div>
      <button className="capture-button" onClick={capture}>Capture Photo</button>
      <div className="gallery-container">
        <Gallery />
      </div>
    </div>
  );
};

export default CameraPage;
