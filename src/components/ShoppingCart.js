import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../actions/cartActions";
import { scrollToSection } from "../utils/scrollUtils";

import Airfryers from "./Airfryers";
import Accesories from "./Accesories";
import StripePayment from "./StripePayment/StripePayment";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function ShoppingCart() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.cart);
  const [newOrder, setNewOrder] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    cp: "",
    ciudad: "",
    email: "",
    products: shoppingCart,
    status: "",
    total: 0,
    stripeId: "",
  });
  const [detailsView, setDetailsView] = useState(false);
  const [formError, setFormError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [paymentView, setPaymentView] = useState(false);
  const [congratsView, setCongratsView] = useState(false);

  // Calculate the total price
  const totalPrice = shoppingCart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      products: shoppingCart,
      total: totalPrice,
    }));
  }, [shoppingCart, totalPrice]);

  const handleQuantityChange = (itemId, quantityChange, itemQuantity) => {
    const newQuantity = itemQuantity + quantityChange;
    if (newQuantity >= 1 && newQuantity <= 10) {
      dispatch(updateCartItem(itemId, quantityChange));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const { nombre, apellidos, direccion, cp, ciudad, email } = newOrder;

    // Check if all fields are filled
    if (!nombre || !apellidos || !direccion || !cp || !ciudad || !email) {
      setFormError('*Todos los datos son obligatorios')
      return false;
    }

    // Check if email is in correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('*Introduce una dirección de email válida')
      return false;
    }

    return true;
  };

  const handleConfirmButton = () => {
  if (isFormValid()) {
    setPaymentView(!paymentView);
    setDetailsView(!detailsView);
    scrollToSection("top");
  }
  };

  const handleClearCart = () => {
    dispatch(clearCart());

    // Clear local storage
    localStorage.removeItem("cartData");

    // Reset new order state
    setNewOrder({
      nombre: "",
      apellidos: "",
      direccion: "",
      cp: "",
      ciudad: "",
      email: "",
      products: shoppingCart,
      status: "",
      total: 0,
      stripeId: "",
    });
  }

  return (
    <div>
      {/************ SECOND NAVBAR **************/}
      <div className="second-nav-bar-container" id="top">
        <section className="d-flex my-3" id="second-navbar">
          <Link to="/#home" className="second-navbar">
            <i className="fa-solid fa-house me-1"></i> Inicio &nbsp; {">"}{" "}
            &nbsp;
          </Link>
          <a className="second-navbar" href="/shopping-cart">
            Carrito
          </a>
        </section>
        <div className="w-80">
          <hr className="grey-line"></hr>
        </div>
      </div>
      {/************ SHOPPING CART **************/}
      {shoppingCart.length > 0 || congratsView ? (
        <div>
          {!paymentView && !congratsView && (
            <>
              <div className="cart-table">
                <div className="cart-table-header row align-items-center m-0">
                  <div className="table-box col-sm-2 col-2">
                    <h5>FOTO</h5>
                  </div>
                  <div className="table-box col-sm-3 col-3">
                    <h5>PRODUCTO</h5>
                  </div>
                  <div className="table-box col-sm-2 col-2">
                    <h5>PRECIO</h5>
                  </div>
                  <div className="table-box col-sm-2 col-2">
                    <h5>CANTIDAD</h5>
                  </div>
                  <div className="table-box col-sm-2 col-2">
                    <h5>TOTAL</h5>
                  </div>
                  <div className="table-box col-sm-1 col-1">
                    <h5>X</h5>
                  </div>
                </div>
                <div className="cart-table-body">
                  {shoppingCart.map((item, index) => (
                    <div
                      className="row carrousel align-items-center m-0"
                      key={index}
                    >
                      <div className="table-box col-2">
                        <Link to={`/${item.category}/${item.name}/${item.id}`}>
                          <img
                            src={item.img}
                            alt={item.name}
                            className="img-fluid"
                          />
                        </Link>
                      </div>
                      <div className="table-box col-3">{item.name} {item.color} {item.size}</div>
                      <div className="table-box col-2 price">{item.price}€</div>
                      <div className="table-box col-2">
                        <div className="quantity d-flex col-sm-9 col-12">
                          <p
                            className="quantity-text"
                            onClick={() =>
                              handleQuantityChange(item.id, -1, item.quantity)
                            }
                          >
                            -
                          </p>
                          <p>{item.quantity}</p>
                          <p
                            className="quantity-text"
                            onClick={() =>
                              handleQuantityChange(item.id, 1, item.quantity)
                            }
                          >
                            +
                          </p>
                        </div>
                      </div>
                      <div className="table-box col-2 price">
                        {item.price * item.quantity}€
                      </div>
                      <div
                        className="table-box col-1 pointer"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        X
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="total-container">
                <div className="col-lg-2 col-md-3 col-sm-5 col-6">
                  <div className="total p-3">
                    <span>TOTAL</span>
                    <span className="price">{totalPrice}€</span>
                  </div>
                  <div
                    className="start-buy p-3"
                    onClick={() => setDetailsView(!detailsView)}
                  >
                    comprar
                  </div>
                </div>
              </div>
            </>
          )}
          {/************ SEND DETAILS **************/}
          {detailsView && (
            <div className="send-details ">
              <div className="col-9">
              <div className="gradient-custom row">
                <div className="col-md-3 d-flex justify-content-center align-items-center pt-4 ps-2">
                  <div className="text-center">
                    <i
                      id="animationDemo"
                      data-mdb-animation="slide-right"
                      data-mdb-toggle="animation"
                      data-mdb-animation-reset="true"
                      data-mdb-animation-start="onScroll"
                      data-mdb-animation-on-scroll="repeat"
                      className="fas fa-3x fa-shipping-fast text-white"
                    ></i>
                    <h5 className="mt-3 text-white">Entrega garantizada</h5>
                  </div>
                </div>
                <div className="col-md-9 p-3 justify-content-end">
                  <div className="card card-custom">
                    <div className="card-body mt-0 mx-5">
                      <div className="text-center mb-3 pb-2 mt-3">
                        <h5 style={{ color: "#495057", fontWeight: "700" }}>
                          DATOS DE ENVIO
                        </h5>
                      </div>
                      <form className="mb-0">
                        <div className="row mb-4">
                          <input
                            type="text"
                            placeholder="NOMBRE"
                            name="nombre"
                            value={newOrder.nombre}
                            onChange={handleInputChange}
                            className="col-sm-6 col-11 mb-3"
                          />
                          <input
                            type="text"
                            placeholder="APELLIDOS"
                            name="apellidos"
                            value={newOrder.apellidos}
                            onChange={handleInputChange}
                            className="col-sm-6 col-11 mb-3"
                          />
                          <input
                            type="text"
                            placeholder="DIRECCION"
                            name="direccion"
                            value={newOrder.direccion}
                            onChange={handleInputChange}
                            className="col-sm-6 col-11 mb-3"
                          />
                          <input
                            type="number"
                            placeholder="CODIGO POSTAL"
                            name="cp"
                            value={newOrder.cp}
                            onChange={handleInputChange}
                            className="col-sm-6 col-11 mb-3"
                          />
                          <input
                            type="text"
                            placeholder="CIUDAD"
                            name="ciudad"
                            value={newOrder.ciudad}
                            onChange={handleInputChange}
                            className="col-sm-6 col-11 mb-3"
                          />
                          <input
                            type="email"
                            placeholder="EMAIL"
                            name="email"
                            value={newOrder.email}
                            onChange={handleInputChange}
                            className="col-sm-6 col-11 mb-3"
                          />
                          <div style={{ color: "red" }}>{emailError}</div>
                          <div style={{ color: "red" }}>{formError}</div>
                        </div>
                      </form>
                      <div className="float-end ">
                        <button
                          className="start-buy p-3"
                          onClick={handleConfirmButton}
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}
          {/************ PAYMENT **************/}
          {paymentView && (
            <div className="send-details">
              <div className="gradient-custom row">
                <div className="col-md-3 d-flex justify-content-center align-items-center pt-4 ps-2">
                  <div className="text-center">
                    <i
                      id="animationDemo"
                      data-mdb-animation="slide-right"
                      data-mdb-toggle="animation"
                      data-mdb-animation-reset="true"
                      data-mdb-animation-start="onScroll"
                      data-mdb-animation-on-scroll="repeat"
                      className="far fa-3x fa-credit-card text-white"
                    ></i>
                    <h5 className="mt-3 text-white">PAGO SEGURO</h5>
                  </div>
                </div>
                <div className="col-md-9 p-3 justify-content-end">
                  <div className="card card-custom">
                    <div className="card-body mt-0 mx-5">
                      <div className="text-center mb-3 pb-2 mt-3">
                        <h5 style={{ color: "#495057", fontWeight: "700" }}>
                          REVISA LOS DATOS
                        </h5>
                      </div>
                      <div className="mb-0">
                        <div className="row mb-4">
                          <div className="col-sm-6 col-11 mb-3">
                            <p className="m-0">
                              {newOrder.direccion}, {newOrder.cp},{" "}
                              {newOrder.ciudad}
                            </p>
                            <p className="m-0">
                              {newOrder.nombre} {newOrder.apellidos}
                            </p>
                            <p>{newOrder.email}</p>
                          </div>
                          <div className="col-sm-6 col-11 mb-3 d-flex justify-content-end">
                            <button
                              className="start-buy p-3"
                              onClick={handleConfirmButton}
                            >
                              Cambiar
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mb-0">
                        <div className="row order-details mb-4">
                          {newOrder.products.map((product) => (
                            <div
                              key={product.name}
                              className="row m-0 px-0 py-3 d-flex"
                            >
                              <div className="col-8 d-flex align-items-center m-0">
                                <div className="col-3 ms-0 me-2">
                                  <img
                                    src={product.img}
                                    alt={product.name}
                                    className="img-fluid border-orange"
                                  />
                                </div>
                                <div>
                                  <p className="m-0">
                                    {product.quantity} x {product.name}{" "}
                                    {product.color} {product.size}
                                  </p>
                                </div>
                              </div>
                              <div className="col-4 d-flex align-items-center justify-content-end">
                                <span className="price">
                                  {product.price * product.quantity}€
                                </span>
                              </div>
                            </div>
                          ))}
                          <div className="total p-3">
                            <span>TOTAL</span>
                            <span className="price">{totalPrice}€</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mb-3 pb-2 mt-3">
                        <h5 style={{ color: "#495057", fontWeight: "700" }}>
                          DATOS DE LA TARJETA
                        </h5>
                      </div>
                      <div className="ps-5">
                        <Elements stripe={stripePromise}>
                          <StripePayment
                            newOrder={newOrder}
                            setNewOrder={setNewOrder}
                            setPaymentView={setPaymentView}
                            setCongratsView={setCongratsView}
                          />
                        </Elements>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/************ CONGRATS **************/}
          {congratsView && (
            <div className="send-details">
              <div className="gradient-custom row">
                <div className="col-md-3 d-flex justify-content-center align-items-center pt-4 ps-2">
                  <div className="text-center">
                    <i
                      id="animationDemo"
                      data-mdb-animation="slide-right"
                      data-mdb-toggle="animation"
                      data-mdb-animation-reset="true"
                      data-mdb-animation-start="onScroll"
                      data-mdb-animation-on-scroll="repeat"
                      className="fas fa-3x fa-clipboard-check text-white"
                    ></i>
                    <h5 className="mt-3 text-white">PEDIDO CONFIRMADO</h5>
                  </div>
                </div>
                <div className="col-md-9 p-3 justify-content-end">
                  <div className="card card-custom">
                    <div className="card-body mt-0 mx-5">
                      <div className="text-center mb-3 pb-2 mt-3">
                        <h5 style={{ color: "#495057", fontWeight: "700" }}>
                          DATOS DEL PEDIDO
                        </h5>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-11 mb-3">
                          <h5
                            style={{
                              color: "#495057",
                              fontWeight: "700",
                              fontSize: "12px",
                            }}
                          >
                            NUMERO DE PEDIDO
                          </h5>
                          <p className="mt-0 mb-3">{newOrder.stripeId}</p>
                          <h5
                            style={{
                              color: "#495057",
                              fontWeight: "700",
                              fontSize: "12px",
                            }}
                          >
                            DIRECCION DE ENTREGA
                          </h5>
                          <p className="mt-0 mb-3">
                            {newOrder.direccion}, {newOrder.cp},{" "}
                            {newOrder.ciudad}
                          </p>
                          <h5
                            style={{
                              color: "#495057",
                              fontWeight: "700",
                              fontSize: "12px",
                            }}
                          >
                            DATOS DE CONTACTO
                          </h5>
                          <p className="m-0">
                            {newOrder.nombre}, {newOrder.apellidos}
                          </p>
                          <p className="m-0">{newOrder.email}</p>
                        </div>
                        <div className="col-sm-6 col-11">
                          <p
                            className="mt-0 mb-3"
                            style={{
                              color: "#e7ab3d",
                              fontWeight: "700",
                              // fontSize: "12px",
                            }}
                          >
                            🎉 ¡Muchas gracias por confiar en nosotros! 🎉
                          </p>
                          <p
                            className="mt-0 mb-3"
                            style={{
                              color: "#e7ab3d",
                              fontWeight: "700",
                              fontSize: "12px",
                            }}
                          >
                            En breves recibirás un correo con los datos de
                            confirmación
                          </p>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <h5
                          style={{
                            color: "#495057",
                            fontWeight: "700",
                            fontSize: "12px",
                          }}
                        >
                          PRODUCTOS
                        </h5>
                        {newOrder.products.map((product) => (
                          <div key={product.name} className="row">
                            <div className="col-2">
                              <img
                                src={product.img}
                                alt={product.name}
                                className="img-fluid"
                              />
                            </div>
                            <div className="col-10 d-flex align-items-center">
                              <p className="m-0">
                                {product.name} {product.color} {product.size}
                                <span className="price">
                                  {product.quantity} x{" "}
                                  {product.price * product.quantity}€
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="total p-3">
                          <span>TOTAL</span>
                          <span className="price">{totalPrice}€</span>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-sm-6 col-11 mb-3 d-flex justify-content-center">
                          <Link to="/">
                            <button className="start-buy p-3" onClick={handleClearCart}>
                              SEGUIR COMPRANDO
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center ">
          <h2>Añade algún producto a tu carrito:</h2>
          <div>
            <Airfryers />
            <Accesories />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
