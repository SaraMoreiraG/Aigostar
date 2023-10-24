import React, { useEffect, useState, useRef } from "react";
import "./ImageGallery.css"; // Asegúrate de tener un archivo CSS para estilizar la galería

const ImageGallery = ({ images, selectedColor, selectedSize }) => {
  const [selectedImage, setSelectedImage] = useState(images);
  // const [selectedColorImg, setSelectedColorImg] = useState(selectedColor);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  const isInitialMount = useRef(true); // Create a ref to track initial mount

  // ...other component code...

  // This useEffect runs only when selectedColor or selectedSize change, not during initial mount
  useEffect(() => {
    if (!isInitialMount.current) {
      for (let i = 0; i < images.colors.length; i++) {
        if (
          images.colors[i].size === selectedSize &&
          images.colors[i].showName === selectedColor
        ) {
          setSelectedImage(images.colors[i].url);
        }
      }
    } else {
      isInitialMount.current = false; // Set to false after initial mount
    }
  }, [selectedColor, selectedSize]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="image-gallery">
      <div className="d-flex justify-content-center">
        <div className="main-image col-9">
          <img
            src={selectedImage ? selectedImage : images.principals[0]}
            className="img-fluid"
            alt="Imagen principal"
            onMouseOver={() => {
              document.querySelector(".main-image img").classList.add("zoomed");
            }}
            onMouseOut={() => {
              document
                .querySelector(".main-image img")
                .classList.remove("zoomed");
            }}
          />
        </div>
      </div>
      <div className="thumbnails row d-flex justify-content-center gap-2 py-3">
        {/* Render principal thumbnails */}
        {images.principals.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Miniatura ${index + 1}`}
            className={`thumbnail col-1 m-0 p-1 ${
              selectedImage === image ? "selected" : ""
            }`}
            onMouseOver={() => handleThumbnailClick(image)}
          />
        ))}
        {/* Render selected color img */}
        {images.colors.map(
          (color, index) =>
            color.showName === selectedColor &&
            color.size === selectedSize && (
              <img
                key={index}
                src={color.url}
                alt={`Miniatura ${color.name + 1}`}
                className={`thumbnail col-1 m-0 p-1 ${
                  selectedImage === color.url ? "selected" : ""
                }`}
                onMouseOver={() => handleThumbnailClick(color.url)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
