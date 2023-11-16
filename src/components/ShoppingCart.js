import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateCartItem } from "../actions/cartActions";
import Airfryers from "./Airfryers";
import Accesories from "./Accesories";

function ShoppingCart() {
  const shoppingCart = useSelector((state) => state.cart);
  const [newOrder, setNewOrder] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    cp: "",
    ciudad: "",
    email: "",
    products: shoppingCart,
    status: "",
    total: 0,
    color: "",
    size: "",
  });
  const dispatch = useDispatch();
  const [isBuying, setIsBuying] = useState(false);
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);
  console.log(newOrder);
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

  const handleConfirmButton = () => {
    setDetailsConfirmed(!detailsConfirmed);
    setIsBuying(!isBuying);
  };

  return (
    <div>
      {/************ SECOND NAVBAR **************/}
      <div className="second-nav-bar-container">
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
      {shoppingCart.length > 0 ? (
        <div>
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
                  <div className="table-box col-3">{item.name}</div>
                  <div className="table-box col-2 price">{item.price}€</div>
                  <div className="table-box col-2">
                    {/* <div className="row justify-content-center"> */}
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
                    {/* </div> */}
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
            <div className="col-sm-4 col-6">
              <div className="total p-3">
                <span>TOTAL</span>
                <span className="price">{totalPrice}€</span>
              </div>
              <div
                className="start-buy p-3"
                onClick={() => setIsBuying(!isBuying)}
              >
                comprar
              </div>
            </div>
          </div>
          {/************ SEND DETAILS **************/}
          {isBuying && (
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
                            placeholder="APELLIDO"
                            name="apellido"
                            value={newOrder.apellido}
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
                            type="text"
                            placeholder="EMAIL"
                            name="email"
                            value={newOrder.email}
                            onChange={handleInputChange}
                            className="col-sm-6 col-11 mb-3"
                          />
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
          )}
          {/************ PAYMENT **************/}
          {detailsConfirmed && (
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
                              {newOrder.nombre}, {newOrder.apellido}
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
                        <div className="row mb-4">
                          {newOrder.products.map((product) => (
                            <div className="row">
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
                      </div>
                      <div className="text-center mb-3 pb-2 mt-3">
                        <h5 style={{ color: "#495057", fontWeight: "700" }}>
                          DATOS DE LA TARJETA
                        </h5>
                      </div>
                      <div className="col-sm-6 col-11 mb-3 d-flex justify-content-end">
                        <button
                          className="start-buy p-3"
                          onClick={handleConfirmButton}
                        >
                          Pagar
                        </button>
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
