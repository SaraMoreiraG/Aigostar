import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import cart from "../assets/images/icon-basket.png";
import ImageGallery from "./ImageGallery/ImageGallery";
import AirfryerComparisonTable from "./AirfryerComparisonTable";

function ProductDetails() {
  let { category, name, id } = useParams();
  const { quantity, setCuantity } = useState(0);
  const accesories = useSelector((state) => state.accesories);
  const categoryData = useSelector((state) => {
    if (category === "airfryers") {
      return state.airfryers;
    } else if (category === "accesories") {
      return state.accesories;
    }
    return null; // Maneja el caso en el que no se encuentra la categoría
  });
  const scrollToSection = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleQuantityChange = (change) => {
    if (quantity + change >= 0) {
      setCuantity((quantity += change));
      console.log(quantity);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/************ SECOND NAVBAR **************/}
      <section className="d-flex my-3" id="second-navbar">
        <Link to="/#home">Inicio {">"}</Link>
        {category === "airfryers" ? (
          <Link to="/#airfryers">Freidoras de aire {">"}</Link>
        ) : (
          <a onClick={() => scrollToSection("accesories")}>Accesorios {">"}</a>
        )}
        <a>{name}</a>
      </section>
      {/************ GALLERY AND PRODUCT DETAILS **************/}
      <section className="row" id="product">
        <section className="col-6">
          <ImageGallery images={categoryData[id].thumbnails} />
        </section>
        <section className="col-6">
          <h1>
            {name} - {categoryData[id].title}
          </h1>
          <div>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <span> {categoryData[id].estadisticas.puntuacion}</span>
          </div>
          <h5>{categoryData[id].description}</h5>
          {categoryData === "airfryers" ? (
            <>
              <p>Comensales: {categoryData[id].details.comensales}</p>
              <p>Control: {categoryData[id].details.control}</p>
              <p>
                Temporizador: {categoryData[id].details.temporizador} minutos
              </p>
            </>
          ) : (
            <p>Comensales: {categoryData[id].details.name}</p>
          )}

          <h2 className="price my-3">{categoryData[id].price}€</h2>

          <p className="fw-bold">Quantity: {quantity}</p>
          <div className="d-flex mb-3">
            <p className={"size-text"} onClick={() => handleQuantityChange(-1)}>
              -
            </p>
            <p className={"size-text"}>{quantity}</p>
            <p className={"size-text"} onClick={() => handleQuantityChange(1)}>
              +
            </p>
          </div>

          <button class="icon-button btn-orange">
            Añadir al carrito
            <img src={cart} alt="Icon" />
          </button>
        </section>
      </section>
      {/************ COMPARATION TABLE **************/}
      <section className="row p-5 m-5">
        <AirfryerComparisonTable
          infoClick={() => scrollToSection("second-navbar")}
        />
      </section>
      {/******** ACCESORIES ********/}
      <section id="accesories" className="row align-items-center p-5 pb-0">
        <div className="d-flex">
          {accesories.map((accesory) => (
            <div key={accesory.id} className="text-center px-3 col-3" onClick={() => scrollToSection("second-navbar")}>
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
                  <button className="btn-cart right-to-left product-card m-0"></button>
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
    </div>
  );
}

export default ProductDetails;
