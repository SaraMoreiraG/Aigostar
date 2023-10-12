import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "../assets/images/banner1.jpg";
import banner2 from "../assets/images/banner2.jpg";
import banner3 from "../assets/images/banner3.jpg";


const images = [
  { id: 1, src: banner1, alt: "Descripción 1" },
  { id: 2, src: banner2, alt: "Descripción 2" },
  { id: 3, src: banner3, alt: "Descripción 3" },
];

const Home = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
	autoplay: true, // Habilita la auto-reproducción
    autoplaySpeed: 3000, // Establece el intervalo en milisegundos (3 segundos)
  };

  return (
    <div>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
