import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function ShoppingCart() {
	const shoppingCart = useSelector(state => state.cart);
	console.log(shoppingCart)
  return (
    <div className="px-5 mx-5">
      {/************ SECOND NAVBAR **************/}
      <section className="d-flex my-3 px-5 mx-5" id="second-navbar">
        <Link to="/#home" className="second-navbar">
          <i className="fa-solid fa-house me-1"></i> Inicio &nbsp; {">"} &nbsp;
        </Link>
        <a className="second-navbar">Carrito</a>
      </section>
      <div className="px-5 mx-5 w-80">
        <hr className="grey-line"></hr>
      </div>
	  {/************ SHOPPING CART **************/}
	  <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {shoppingCart.map((item, index) => (
          <li key={index}>{item.name} - {item.price}€</li>
        ))}
      </ul>
    </div>
	</div>
  )
}

export default ShoppingCart
