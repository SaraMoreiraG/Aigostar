import React from "react";
import { Link } from "react-router-dom";

import AddToCartButton from "../AddToCartButton/AddToCartButton";

function ProductCard({ product }) {
  const item = {
    id: parseInt(product.id, 10),
    img: product.thumbnails[0],
    name: product.name,
    price: product.price,
    quantity: 1,
  };
  return (
    <div>
      <div className="magic-div">

          <img
            src={product.thumbnails[0]}
            alt={`airfryer ${product.name}`}
            className="img-fluid zoom mb-2"
          />
          <div className="text-overlay up-opaccity-effect">
            <button className="btn-orange">+ INFO</button>
          </div>

        <AddToCartButton
          item={item}
          style="btn-cart right-to-left margin product-card m-0"
        />
      </div>
      <span className="no-underline">{product.name}</span>
      <div>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <span> {product.estadisticas.puntuacion}</span>
      </div>
      <div>
        <span>{product.estadisticas.valoraciones} valoraciones | </span>
        <span>{product.estadisticas.vendidos} vendidos</span>
      </div>
      <h5 className="mt-2 mb-1">Capacidad: {product.title}</h5>
      <p className="price">{product.price}€</p>
    </div>
  );
}

export default ProductCard;
