import React, {useState} from "react";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { scrollToSection } from "../../utils/scrollUtils";

function ProductCard({ product }) {
  // Create an 'item' object for the cart
  const item = {
    id: parseInt(product.id, 10),
    img: product.thumbnails.principals[0],
    name: product.name,
    price: product.price,
    quantity: 1,
    category: product.category,
    size: '',
    color: ''
  };
  const [isSmallScreen] = useState(window.innerWidth < 700);

  return (
    <div className="product-card-container">
      <div className="magic-div">
        {/* Product Image */}
        <img
          src={product.thumbnails.principals[0]}
          alt={`airfryer ${product.name}`}
          className="img-fluid zoom mb-2"
          onClick={() => scrollToSection("second-navbar")}
        />
        {/* Button to show more information */}
        <div className="text-overlay up-opaccity-effect">
          <button className="btn-orange" onClick={() => scrollToSection("second-navbar")}>+ INFO</button>
        </div>
        {/* Button to add to cart Component */}
        <AddToCartButton
          item={item}
          type="btn-cart right-to-left margin product-card m-0"
        />
      </div>
      {/* Product Name */}
      <span className="no-underline">{product.name}</span>
      {/* Star Ratings */}
      <div>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <span> {product.estadisticas.puntuacion}</span>
      </div>
      {/* Ratings and Sold Count */}
      {!isSmallScreen &&
      <div>
        <span>{product.estadisticas.valoraciones} valoraciones | </span>
        <span>{product.estadisticas.vendidos} vendidos</span>
      </div>
      }
      {/* Product Capacity */}
      <div className="row justify-content-center">
        <div className="col-md-12 col-9">
      <h5 className="mt-2 mb-1">{product.title}</h5>
      </div>
      {/* Product Price */}
      <p className="price">{product.price}€</p>
      </div>
    </div>
  );
}

export default ProductCard;
