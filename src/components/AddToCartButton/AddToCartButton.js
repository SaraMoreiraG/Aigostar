import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import cart from "../../assets/images/icon-basket.png";

// En AddToCartButton.js
function AddToCartButton({ item, style }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  // Estado local para isInCart\
  console.log('Store Cart: ', cartItems)
    const [isInCart, setIsInCart] = useState(false);

    // UseEffect para escuchar cambios en cartItems y actualizar isInCart
    useEffect(() => {
      const inCart = cartItems.some((cartItem) => cartItem.id === item.id);
      setIsInCart(inCart);
    }, [cartItems, item.id]);

  const handleAddToCart = (e) => {
    // Evitar la acción de navegación
    e.preventDefault();
    dispatch(addToCart(item));
  };
  return (
    <div>
      {style === "btn-orange icon-button moving" && (
        <button
          onClick={handleAddToCart}
          className={isInCart ? `${style} is-in-cart` : style}
        >
          {isInCart ? "Añadido al carrito" : "Añadir al carrito"}
          {isInCart ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <img src={cart} alt="Icon" />
          )}
        </button>
      )}
      {style === "table-btn" && (
        <button
          onClick={handleAddToCart}
          className={
            isInCart ? `${style} btn-in-cart` : `${style} btn-not-cart`
          }
        ></button>
      )}
      {style === "btn-cart right-to-left margin product-card m-0" && (
        <button
          onClick={handleAddToCart}
          className={
            isInCart ? `${style} btn-in-cart` : `${style} btn-not-cart`
          }
        ></button>
      )}

    </div>
  );
}
export default AddToCartButton;
