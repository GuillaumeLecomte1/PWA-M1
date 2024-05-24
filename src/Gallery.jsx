import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('capturedPhotos')) || [];
    setImages(storedImages);

    const handleOnline = () => {
      syncPhotos();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const syncPhotos = () => {
    const storedImages = JSON.parse(localStorage.getItem('capturedPhotos')) || [];
    const updatedImages = storedImages.map(img => {
      if (!img.synced && navigator.onLine) {
        return { ...img, synced: true };
      }
      return img;
    });

    localStorage.setItem('capturedPhotos', JSON.stringify(updatedImages));
    setImages(updatedImages);
  };

  return (
    <div className="gallery">
      {images.map((img, index) => (
        <div key={index}>
          <img src={img.src} alt={`Captured ${index}`} style={{ width: '100px', height: '100px', margin: '10px' }} />
          <p>{img.synced ? "Synchronisée" : "Non synchronisée"}</p>
        </div>
      ))}
      <button onClick={syncPhotos}>Synchroniser les photos</button>
    </div>
  );
};

export default Gallery;
