import React, { useEffect, useState } from 'react';
import './ImageGallery.css'; // Asegúrate de tener un archivo CSS para estilizar la galería

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0])
  }, [(images)]);


  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="image-gallery">
      <div className='d-flex justify-content-center'>
      <div className="main-image col-9">
        <img
          src={selectedImage}
          className='img-fluid'
          alt="Imagen principal"
          onMouseOver={() => {
            document.querySelector('.main-image img').classList.add('zoomed');
          }}
          onMouseOut={() => {
            document.querySelector('.main-image img').classList.remove('zoomed');
          }}
        />
        </div>
      </div>
      <div className="thumbnails row d-flex justify-content-center gap-2 py-3">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Miniatura ${index + 1}`}
            className={`thumbnail col-1 m-0 p-1 ${selectedImage === image ? 'selected' : ''}`}
            onMouseOver={() => handleThumbnailClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
