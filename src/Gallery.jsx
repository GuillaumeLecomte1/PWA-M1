import React, { useState, useEffect } from 'react';

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

export default Gallery;
