import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateCartItem } from "../actions/cartActions";
import Airfryers from "./Airfryers";
import Accesories from "./Accesories";

function ShoppingCart() {
  const shoppingCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isBuying, setIsBuying] = useState(true);
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);

  // Calculate the total price
  const totalPrice = shoppingCart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleQuantityChange = (itemId, quantityChange, itemQuantity) => {
    const newQuantity = itemQuantity + quantityChange;
    if (newQuantity >= 1 && newQuantity <= 10) {
      dispatch(updateCartItem(itemId, quantityChange));
    }
  };

  return (
    <div>
      {/************ SECOND NAVBAR **************/}
      <div className="second-nav-bar-container">
      <section className="d-flex my-3" id="second-navbar">
        <Link to="/#home" className="second-navbar">
          <i className="fa-solid fa-house me-1"></i> Inicio &nbsp; {">"} &nbsp;
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
                  <div className="row carrousel align-items-center m-0" key={index}>
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
              <div className="start-buy p-3" onClick={() => setIsBuying(true)}>
                comprar
              </div>
            </div>
          </div>
          {/************ SEND DETAILS **************/}
          {isBuying && (
            <div className="send-details">
                <div className="gradient-custom row">
                  <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div
                      style={{
                        "margin-top": "50px",
                        "margin-left": "10px",
                      }}
                      className="text-center"
                    >
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
                  <div className="col-md-9 p-3 justify-content-center">
                    <div className="card card-custom pb-4">
                      <div className="card-body mt-0 mx-5">
                        <div className="text-center mb-3 pb-2 mt-3">
                          <h5 style={{ color: "#495057", fontWeight: "700" }}>
                            DATOS DE ENVIO
                          </h5>
                        </div>
                        <form className="mb-0">
                          <div className="row mb-4">
                            <div className="col-sm-6 col-12">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  id="form9Example1"
                                  className="form-control input-custom"
                                />
                                <label
                                  className="form-label"
                                  for="form9Example1"
                                >
                                  Nombre
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-6 col-12">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  id="form9Example2"
                                  className="form-control input-custom"
                                />
                                <label
                                  className="form-label"
                                  for="form9Example2"
                                >
                                  Apellidos
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-sm-6 col-12">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  id="form9Example3"
                                  className="form-control input-custom"
                                />
                                <label
                                  className="form-label"
                                  for="form9Example3"
                                >
                                  Dirección
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-6 col-12">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  id="form9Example4"
                                  className="form-control input-custom"
                                />
                                <label
                                  className="form-label"
                                  for="form9Example4"
                                >
                                  Código postal
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-sm-6 col-12">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  id="form9Example6"
                                  className="form-control input-custom"
                                />
                                <label
                                  className="form-label"
                                  for="form9Example6"
                                >
                                  Ciudad
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-6 col-12">
                              <div className="form-outline">
                                <input
                                  type="email"
                                  id="typeEmail"
                                  className="form-control input-custom"
                                />
                                <label className="form-label" for="typeEmail">
                                  Email
                                </label>
                                <span>*Seguimiento del pedido</span>
                              </div>
                            </div>
                          </div>
                          <div className="float-end ">
                            <button
                              className="start-buy p-3"
                              onClick={() => setDetailsConfirmed(true)}
                            >
                              Confirmar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          )}
          {/************ PAYMENT **************/}
          {detailsConfirmed && <div>cooonfirmao</div>}
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
