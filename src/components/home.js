import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard/ProductCard";
import { scrollToSection } from "../utils/scrollUtils";

import "../App.css";

const Home = () => {
  // Import necessary dependencies and hooks
  const airfryers = useSelector((state) => state.airfryers);
  const accessories = useSelector((state) => state.accessories);

  // Create refs for each section
  const homeSectionRef = useRef(null);
  const airfryersSectionRef = useRef(null);
  const accessoriesSectionRef = useRef(null);
  const recipesSectionRef = useRef(null);

  useEffect(() => {
    // Check if there is a hash in the URL
    if (window.location.hash) {
      // Check the hash in the URL and scroll to the corresponding section if it exists
      if (
        window.location.hash === "#airfryers" &&
        airfryersSectionRef.current
      ) {
        airfryersSectionRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (
        window.location.hash === "#accessories" &&
        accessoriesSectionRef.current
      ) {
        accessoriesSectionRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (
        window.location.hash === "#recipes" &&
        recipesSectionRef.current
      ) {
        recipesSectionRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (window.location.hash === "#home" && homeSectionRef.current) {
        homeSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

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
      <section ref={homeSectionRef} className="row p-5 py-5">
        <div
          className="magic-div col-4 p-1"
          onClick={() => scrollToSection("airfryers", airfryersSectionRef)}
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
          onClick={() => scrollToSection("accessories", accessoriesSectionRef)}
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
          onClick={() => scrollToSection("recipes", recipesSectionRef)}
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
      <section
        ref={airfryersSectionRef}
        id="airfryers"
        className="row align-items-center p-5 pb-0"
      >
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
                <ProductCard product={airfryer} />
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
      {/******** ACCESSORIES ********/}
      <section
        ref={accessoriesSectionRef}
        id="accessories"
        className="row align-items-center p-5 pb-0"
      >
        <div className="d-flex">
          {accessories.map((accesory) => (
            <div key={accesory.id} className="text-center px-3 col-3">
              <Link
                to={`/accessories/${accesory.name}/${accesory.id}`}
                className="no-underline"
              >
                <ProductCard product={accesory} />
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/******** RECEIPES ********/}
      <section
        id="recipes"
        ref={homeSectionRef}
        className="row text-center p-5 pb-0"
      >
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
