import React from "react";
import { useSelector } from "react-redux";

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
    <div>
      {/******** BANNER ********/}
      <secction>
        <img
          src="https://aigostar-img.s3.amazonaws.com/banner1.jpg"
          alt="airfryer o freidora de aire"
        />
      </secction>
      {/******** CATEGORIAS ********/}
      <section className="row p-5 pb-0">
        <div className="cat1 col-4 p-3" onClick={() => scrollToSection("airfryers")}>
          <img
            src="https://aigostar-img.s3.amazonaws.com/freidora-aire-airfryer-cat1.jpg"
            alt="airfryer o freidora de aire barata"
            className="img-fluid"
          />
          <div className="overlay">
            <div className="text">Airfryer</div>
          </div>
        </div>
        <div className="cat1 col-4 p-3" onClick={() => scrollToSection("accesories")}>
          <img
            src="https://aigostar-img.s3.amazonaws.com/accesorios-freidora-de-aire-cat2.jpg"
            alt="accesorios para airfryer o freidora de aire"
            className="img-fluid"
          />
          <div className="overlay">
            <div className="text">Accesorios</div>
          </div>
        </div>
        <div className="cat1 col-4 p-3" onClick={() => scrollToSection("recipes")}>
          <img
            src="https://aigostar-img.s3.amazonaws.com/recetas-freidora-aire-cat3.jpg"
            alt="recetas para airfryer o freidora de aire"
            className="img-fluid"
          />
          <div className="overlay">
            <div className="text">Recetas</div>
          </div>
        </div>
      </section>
      {/******** AIRFRYERS ********/}
      <section id='airfryers' className="row align-items-center p-5 pb-0">
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
              <img
                src={airfryer.thumbnails[0]}
                alt={`airfryer ${airfryer.name}`}
                className="img-fluid mb-2"
              />
              <span>{airfryer.name}</span>
              <h5 className="mt-2 mb-1">
                Capacidad: {airfryer.details.capacity}L
              </h5>
              <p className="price">{airfryer.price}€</p>
            </div>
          ))}
        </div>
      </section>
      {/******** BANNER PROMO ********/}
      <section className="row m-5 mb-0 p-5" id="banner">
        <div className="text-center col-6">
          <h1 className="mb-0">Oferta de la semana</h1>
          <div className="d-flex justify-content-center">
            <hr></hr>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            ipsum dolor sit amet, consectetur adipisicing elit
          </p>
          <p className="price">60€</p>
          <button className="btn-orange mt-4">Comprar ahora</button>
        </div>
        <div className="col-5 p-5">
          <img
            src="https://aigostar-img.s3.amazonaws.com/hayden-A/haydenA-table.png"
            alt="airfryer oferta"
            className="img-fluid"
          />
        </div>
      </section>
      {/******** ACCESORIES ********/}
      <section id='accesories' className="row align-items-center p-5 pb-0">
        <div className="d-flex col-12">
          {accesories.map((accesory) => (
            <div key={accesory.id} className="text-center px-3 col-">
              <img
                src={accesory.thumbnails[0]}
                alt={`accesory ${accesory.name}`}
                className="img-fluid mb-2"
              />
              <span>{accesory.name}</span>
              <h5 className="mt-2 mb-1">Capacidad: {accesory.name}L</h5>
              <p className="price">{accesory.price}€</p>
            </div>
          ))}
        </div>
      </section>
      {/******** RECEIPES ********/}
      <section id='recipes' className="row text-center p-5 pb-0">
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
    </div>
  );
};

export default Home;
