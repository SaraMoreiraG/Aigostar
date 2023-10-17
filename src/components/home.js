import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../App.css";

const Home = () => {
  const airfryers = useSelector((state) => state.airfryers);
  const accesories = useSelector((state) => state.accesories);

  const scrollToSection = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/******** BANNER ********/}
      <section>
        <img
          src="https://aigostar-img.s3.amazonaws.com/banner1.jpg"
          alt="airfryer o freidora de aire"
        />
      </section>
      {/******** CATEGORIAS ********/}
      <section className="row p-5 py-5">
        <div
          className="magic-div col-4 p-1"
          onClick={() => scrollToSection("airfryers")}
        >
          <img
            src="https://aigostar-img.s3.amazonaws.com/freidora-aire-airfryer-cat1.png"
            alt="airfryer o freidora de aire barata"
            className="img-fluid zoom"
          />
          <div className="text-overlay up-effect">
            <button className="btn-orange btn-categories">
              Freidoras de aire
            </button>
          </div>
        </div>
        <div
          className="magic-div col-4 p-3"
          onClick={() => scrollToSection("accesories")}
        >
          <img
            src="https://aigostar-img.s3.amazonaws.com/accesorios-freidora-de-aire-cat2.jpg"
            alt="accesorios para airfryer o freidora de aire"
            className="img-fluid zoom"
          />
          <div className="text-overlay up-effect">
            <button className="btn-orange btn-categories">Accesorios</button>
          </div>
        </div>
        <div
          className="magic-div col-4 p-3"
          onClick={() => scrollToSection("recipes")}
        >
          <img
            src="https://aigostar-img.s3.amazonaws.com/recetas-freidora-aire-cat3.jpg"
            alt="recetas para airfryer o freidora de aire"
            className="img-fluid zoom"
          />
          <div className="text-overlay up-effect">
            <button className="btn-orange btn-categories">Recetas</button>
          </div>
        </div>
      </section>
      {/******** BANNER PROMO ********/}
      <section
        className="row my-5 p-5 justify-content-center align-items-center"
        id="banner"
      >
        <div className="text-center col-6">
          <h1 className="mb-0">¡En oferta esta semana!</h1>
          <div className="d-flex justify-content-center">
            <hr></hr>
          </div>
          <p>{airfryers[2].description}</p>
          <p className="price">{airfryers[2].price}€</p>
          <button className="btn-orange mt-4">Comprar ahora</button>
        </div>
        <div className="d-flex justify-content-center col-4 p-5">
          <Link to="/product/2">
            <img
              src={airfryers[2].imgtable}
              alt="freidorea de aire o airfryer en oferta"
              className="img-fluid zoom"
            />
          </Link>
        </div>
      </section>
      {/******** AIRFRYERS ********/}
      <section id="airfryers" className="row align-items-center p-5 pb-0">
        <div className="col-3">
          <img
            src="https://aigostar-img.s3.amazonaws.com/woman.jpg"
            alt="aigostar airfryer"
            className="img-fluid"
          />
        </div>
        <div className="d-flex col-9">
          {airfryers.map((airfryer) => (
            <div key={airfryer.id} className="text-center px-3 col-4">
              <Link
                to={`airfryers/${airfryer.name}/${airfryer.id}`}
                className="no-underline"
              >
                <div className="magic-div">
                  <img
                    src={airfryer.thumbnails[0]}
                    alt={`airfryer ${airfryer.name}`}
                    className="img-fluid zoom mb-2"
                  />
                  <button className="btn-cart right-to-left margin m-0"></button>
                  <div className="text-overlay up-opaccity-effect">
                    <button className="btn-orange btn-info">+ INFO</button>
                  </div>
                </div>
                <span className="no-underline">{airfryer.name}</span>
                <div>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <span> {airfryer.estadisticas.puntuacion}</span>
                </div>
                <div>
                  <span>
                    {airfryer.estadisticas.valoraciones} valoraciones |{" "}
                  </span>
                  <span>{airfryer.estadisticas.vendidos} vendidos</span>
                </div>
                <h5 className="mt-2 mb-1">
                  Capacidad: {airfryer.details.capacidad}L
                </h5>
                <p className="price">{airfryer.price}€</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/******** BANNER AIRFRYER + KIT ********/}
      <section
        className="row m-5 p-5 justify-content-center align-items-center"
        id="banner"
      >
        <div className="text-center col-6">
          <h1 className="mb-0">En oferta esta semana!</h1>
          <div className="d-flex justify-content-center">
            <hr></hr>
          </div>
          <p>{airfryers[2].description}</p>
          <p className="price">{airfryers[2].price}€</p>
          <button className="btn-orange mt-4">Comprar ahora</button>
        </div>
        <div className="d-flex justify-content-center col-4 p-5">
          <img
            src={airfryers[2].imgtable}
            alt="freidorea de aire o airfryer en oferta"
            className="img-fluid"
          />
        </div>
      </section>
      {/******** ACCESORIES ********/}
      <section id="accesories" className="row align-items-center p-5 pb-0">
        <div className="d-flex">
          {accesories.map((accesory) => (
            <div key={accesory.id} className="text-center px-3 col-3">
              <Link
                to={`/accesories/${accesory.name}/${accesory.id}`}
                className="no-underline"
              >
                <div className="magic-div">
                  <img
                    src={accesory.thumbnails[0]}
                    alt={`accesory ${accesory.name}`}
                    className="img-fluid zoom mb-2"
                  />
                  <button className="btn-cart right-to-left m-0"></button>
                  <div className="text-overlay up-opaccity-effect">
                    <button className="btn-orange btn-info">+ INFO</button>
                  </div>
                </div>
                <span className="no-underline">{accesory.name}</span>
                <div>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <span> {accesory.estadisticas.puntuacion}</span>
                </div>
                <div>
                  <span>
                    {accesory.estadisticas.valoraciones} valoraciones |{" "}
                  </span>
                  <span>{accesory.estadisticas.vendidos} vendidos</span>
                </div>
                <h5 className="mt-2 mb-1">Capacidad: {accesory.id}L</h5>
                <p className="price">{accesory.price}€</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/******** RECEIPES ********/}
      <section id="recipes" className="row text-center p-5 pb-0">
        <h1 className="mb-0">Recetas</h1>
        <div className="d-flex justify-content-center">
          <hr></hr>
        </div>
        <div className="row px-5">
          <div className="col-4 text-start p-3">
            {/* <img src={receip1} alt="receta" className="img-fluid mb-4" /> */}
            <div className="d-flex align-items-center mb-3">
              <i className="fa-regular fa-clock me-2"></i>
              <span className="icon-text me-3">5'</span>
              <i className="fa-regular fa-user me-2"></i>
              <span className="icon-text">2</span>
            </div>
            <h2>The Best Street Style From London Fashion Week</h2>
            <p>
              Sed quia non numquam modi tempora indunt ut labore et dolore
              magnam aliquam quaerat
            </p>
          </div>
          <div className="col-4 text-start p-3">
            {/* <img src={receip1} alt="receta" className="img-fluid mb-4" /> */}
            <div className="d-flex align-items-center mb-3">
              <i className="fa-regular fa-clock me-2"></i>
              <span className="icon-text me-3">5'</span>
              <i className="fa-regular fa-user me-2"></i>
              <span className="icon-text">2</span>
            </div>
            <h2>The Best Street Style From London Fashion Week</h2>
            <p>
              Sed quia non numquam modi tempora indunt ut labore et dolore
              magnam aliquam quaerat
            </p>
          </div>
          <div className="col-4 text-start p-3">
            {/* <img src={receip1} alt="receta" className="img-fluid mb-4" /> */}
            <div className="d-flex align-items-center mb-3">
              <i className="fa-regular fa-clock me-2"></i>
              <span className="icon-text me-3">5'</span>
              <i className="fa-regular fa-user me-2"></i>
              <span className="icon-text">2</span>
            </div>
            <h2>The Best Street Style From London Fashion Week</h2>
            <p>
              Sed quia non numquam modi tempora indunt ut labore et dolore
              magnam aliquam quaerat
            </p>
          </div>
        </div>
      </section>
      {/******** SHIPPING DETAILS ********/}
      <section className="row mx-5 p-5">
        <div className="shipping d-flex justify-content-center align-items-center py-4 col-4">
          <i className="fa-solid fa-truck-moving"></i>
          <div>
            <h5 className="mb-0">FREE SHIPPING</h5>
            <p className="mb-0">For all order over 99$</p>
          </div>
        </div>
        <div className="shipping d-flex justify-content-center align-items-center py-4 col-4">
          <i className="fa-regular fa-clock"></i>
          <div>
            <h5 className="mb-0">DELIVERY ON TIME</h5>
            <p className="mb-0">If good have prolems</p>
          </div>
        </div>
        <div className="shipping d-flex justify-content-center align-items-center py-4 col-4">
          <i className="fa-regular fa-credit-card"></i>
          <div>
            <h5 className="mb-0">SECURE PAYMENT</h5>
            <p className="mb-0">100% secure payment</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
