import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";

import Airfryers from "./Airfryers";
import Accesories from "./Accesories";
import Recipes from "./Recipes";
import { scrollToSection } from "../utils/scrollUtils";

import "../App.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Import necessary dependencies and hooks
  const airfryers = useSelector((state) => state.airfryers);
  const accessorieKit = useSelector((state) => state.accessories[0]);
  const airfryerKit = useSelector((state) => state.airfryers[1]);
  const cartItems = useSelector((state) => state.cart);

  const handleBuyNow = (...items) => {
    items.forEach(item => {
      if (!cartItems.some(cartItem => cartItem.name === item.name)) {
        const newItem = {
          id: parseInt(item.id, 10),
          img: item.thumbnails.principals[0],
          name: item.name,
          price: item.price,
          quantity: 1,
          category: item.category,
          size: "",
          color: "",
        };
        dispatch(addToCart(newItem));
      }
    });

    navigate('/shopping-cart');
  };

  return (
    <>
      {/******** BANNER ********/}
      <section>
        <div>
          <img
            src="https://images-aigostar-cooking.s3.amazonaws.com/banner1.jpg"
            alt="airfryer o freidora de aire"
            className="img-fluid"
          />
        </div>
      </section>
      {/******** CATEGORIAS ********/}
      <section className="row justify-content-center g-3 p-5 py-5">
        <div
          className="magic-div col-md-4 col-sm-6 col-8 p-2"
          onClick={() => scrollToSection("airfryers")}
        >
          <img
            src="https://images-aigostar-cooking.s3.amazonaws.com/freidora-aire-airfryer-cat1.png"
            alt="airfryer o freidora de aire barata"
            className="img-fluid zoom"
          />
          <div className="text-overlay up-effect col-12">
            <button className="btn-orange btn-categories">
              Freidoras de aire
            </button>
          </div>
        </div>
        <div
          className="magic-div col-md-4 col-sm-6 col-8 p-3"
          onClick={() => scrollToSection("accessories")}
        >
          <img
            src="https://images-aigostar-cooking.s3.amazonaws.com/accesorios-freidora-de-aire-cat2.jpg"
            alt="accesorios para airfryer o freidora de aire"
            className="img-fluid zoom"
          />
          <div className="text-overlay up-effect col-12">
            <button className="btn-orange btn-categories">Accesorios</button>
          </div>
        </div>
        <div
          className="magic-div col-md-4 col-sm-6 col-8 p-3"
          onClick={() => scrollToSection("recipes")}
        >
          <img
            src="https://images-aigostar-cooking.s3.amazonaws.com/recetas-freidora-aire-cat3.jpg"
            alt="recetas para airfryer o freidora de aire"
            className="img-fluid zoom"
          />
          <div className="text-overlay up-effect col-12">
            <button className="btn-orange btn-categories">Recetas</button>
          </div>
        </div>
      </section>
      {/******** BANNER PROMO ********/}
      <section
        className="row my-5 p-5 justify-content-center align-items-center"
        id="banner"
      >
        <div className="text-center col-md-6 col-sm-5 col-12">
          <h1 className="mb-0">¡Oferta Black Friday!</h1>
          <div className="d-flex justify-content-center">
            <hr></hr>
          </div>
          <p>{airfryers[2].description}</p>
          <p className="price">{airfryers[2].price}€</p>
          <button
            className="btn-orange mt-4"
            onClick={() => handleBuyNow(airfryers[2])}
          >
            Comprar ahora
          </button>
        </div>
        <div className="d-flex justify-content-center col-md-4 col-sm-6 col-8 p-5">
          <Link to={`airfryers/${airfryers[2].name}/${airfryers[2].id}`}>
            <img
              src={airfryers[2].imgtable}
              alt="freidorea de aire o airfryer en oferta"
              className="img-fluid zoom"
            />
          </Link>
        </div>
      </section>
      {/******** AIRFRYERS ********/}
      <Airfryers />
      {/******** BANNER AIRFRYER + KIT ********/}
      <section
        className="row my-5 p-5 justify-content-center align-items-center"
        id="banner"
      >
        <div className="col-12 text-center">
          <h1 className="mb-0">¡Llévatelos Juntos!</h1>
          <div className="d-flex justify-content-center">
            <hr></hr>
          </div>
          <p>
            Aprovecha esta oferta exclusiva por el Black Friday. Freidora de
            aire más juego de 6 accesorios.
          </p>
        </div>
        <div className="col-12 d-flex justify-content-center ">
          <div className="col-md-3 col-sm-5 col-6 p-1">
            <Link to={`airfryers/${airfryerKit.name}/${airfryerKit.id}`}>
              <img
                src={airfryerKit.imgtable}
                alt="freidorea de aire o airfryer en oferta"
                className="img-fluid zoom"
              />
            </Link>
          </div>
          <div className="col-1"></div>
          <div className="col-md-2 col-sm-3 col-4 p-1">
            <div className="accesorie-kit p-3">
              <Link
                to={`accessories/${accessorieKit.name}/${accessorieKit.id}`}
                className="no-underline"
              >
                <img
                  src={accessorieKit.thumbnails.principals[0]}
                  alt="freidorea de aire o airfryer en oferta"
                  className="img-fluid zoom"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center col-md-6 col-sm-5 col-12">
          <p className="price">110€</p>
          <button className="btn-orange mt-4" onClick={() => handleBuyNow(airfryerKit, accessorieKit )}>Comprar ahora</button>
        </div>
      </section>
      {/******** ACCESSORIES ********/}
      <Accesories />
      {/******** RECEIPES ********/}
      <Recipes />
      {/******** SHIPPING DETAILS ********/}
      <section className="row  p-5">
        <div className="shipping d-flex justify-content-center align-items-center py-4 col-md-4 col-12">
          <i className="fa-solid fa-truck-moving"></i>
          <div>
            <h5 className="mb-0">ENVIO GRATUITO</h5>
            <p className="mb-0">Para todos nuestro productos</p>
          </div>
        </div>
        <div className="shipping d-flex justify-content-center align-items-center py-4 col-md-4 col-12">
          <i className="fa-regular fa-clock"></i>
          <div>
            <h5 className="mb-0">ENTREGA A TIEMPO</h5>
            <p className="mb-0">Recibe tu pedido en 10 días</p>
          </div>
        </div>
        <div className="shipping d-flex justify-content-center align-items-center py-4 col-md-4 col-12">
          <i className="fa-regular fa-credit-card"></i>
          <div>
            <h5 className="mb-0">PAGO SEGURO</h5>
            <p className="mb-0">100% pago seguro</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
