import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { scrollToSection } from "../utils/scrollUtils";

import cart from "../assets/images/icon-basket.png";
import ImageGallery from "./ImageGallery/ImageGallery";
import AirfryerComparisonTable from "./AirfryerComparisonTable";

function ProductDetails() {
  // Get route parameters
  const { category, name, id } = useParams();

  // Initialize quantity state and function to set it
  const [quantity, setQuantity] = useState(1);

  // Access accessories data from Redux store
  const accessories = useSelector((state) => state.accessories);

  // Determine the category data based on the route parameter
  const categoryData = useSelector((state) => {
    if (category === "airfryers") {
      return state.airfryers;
    } else if (category === "accessories") {
      return accessories; // Use the accessories data
    }
    return null; // Handle the case where the category is not found
  });

  // Function to handle changes in the quantity
  const handleQuantityChange = (change) => {
    if (quantity + change >= 1) {
      setQuantity((prevQuantity) => prevQuantity + change);
    }
  };

  // Estado para controlar la visibilidad de los cuadros de diálogo
  const [activeDialog, setActiveDialog] = useState(1);

  // Función para abrir un cuadro de diálogo
  const openDialog = (dialogNumber) => {
    setActiveDialog(dialogNumber);
  };

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/************ SECOND NAVBAR **************/}
      <section className="d-flex my-3 px-5 mx-5" id="second-navbar">
        <Link to="/#home" className="second-navbar">Inicio &nbsp; {">"} &nbsp;</Link>
        {category === "airfryers" ? (
          <Link to="/#airfryers" className="second-navbar">Freidoras de aire &nbsp; {">"} &nbsp;</Link>
        ) : (
          <a className="second-navbar" onClick={() => scrollToSection("accessories")}>Accesorios &nbsp; {">"} &nbsp;</a>
        )}
        <a className="second-navbar">{name}</a>
      </section>
      {/************ GALLERY AND PRODUCT DETAILS **************/}
      <section className="row p-5" id="product">
        <section className="col-6">
          <ImageGallery images={categoryData[id].thumbnails} />
        </section>
        <section className="col-5">
          <h2>
            {name} - {categoryData[id].title}
          </h2>
          <div className="my-3">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <span> {categoryData[id].estadisticas.puntuacion}</span>
          </div>
          <p>{categoryData[id].description}</p>
          {category === "airfryers" ? (
            <>
              <p className="m-0">
                Capacidad: {categoryData[id].details.capacidad}L
              </p>
              <p className="m-0">
                Comensales: {categoryData[id].details.comensales} personas
              </p>
              <p className="m-0">Control: {categoryData[id].details.control}</p>
              <p>
                Temporizador: {categoryData[id].details.temporizador} minutos
              </p>
            </>
          ) : (
            <p>Comensales: {categoryData[id].details.name}</p>
          )}

          <h2 className="price my-3">{categoryData[id].price}€</h2>

          <p className="fw-bold">Cantidad: {quantity}</p>
          <div className="quantity d-flex mb-3 col-2">
            <p className="quantity-text" onClick={() => handleQuantityChange(-1)}>
              -
            </p>
            <p>{quantity}</p>
            <p className="quantity-text" onClick={() => handleQuantityChange(1)}>
              +
            </p>
          </div>
          <div className="mb-3">
            <button className="btn-orange icon-button moving">
              Añadir al carrito
              <img src={cart} alt="Icon" />
            </button>
          </div>

          <div className="d-flex col-12">
            <button className="btn-buy icon-button w-100">
              <i class="fa-regular fa-credit-card"></i>
              Comprar ahora
            </button>
            <div className="d-flex align-items-center ps-2">
            <i class="fa-brands fa-cc-visa me-1"></i>
            <i class="fa-brands fa-cc-mastercard me-1"></i>
            <i class="fa-brands fa-cc-amex"></i>
            </div>
          </div>
        </section>
      </section>

      {/************ ESPECIFICATIONS **************/}
      <div className="my-5">
      <div className="especifications px-5 mx-5">
        <h5 onClick={() => openDialog(1)} className={activeDialog === 1 ? 'active' : ''}>Descripción</h5>
        <h5 onClick={() => openDialog(2)} className={activeDialog === 2 ? 'active' : ''}>Detalles</h5>
        <h5 onClick={() => openDialog(3)} className={activeDialog === 3 ? 'active' : ''}>Valoraciones</h5>
        <h5 onClick={() => openDialog(4)} className={activeDialog === 4 ? 'active' : ''}>Sección 4</h5>
      </div>
      <div className="px-5 mx-5">
      <hr className="w-100 m-2"></hr>
      </div>

      {/* Cuadros de diálogo */}
      {activeDialog === 1 && (
        <div className="dialog px-5 mx-5">
          <div className="dialog-content px-3">
            <p>Cuadro de diálogo de la Sección 1</p>
          </div>
        </div>
      )}

      {activeDialog === 2 && (
        <div className="dialog px-5 mx-5">
          <div className="dialog-content">
            <p>Cuadro de diálogo de la Sección 2</p>
          </div>
        </div>
      )}

      {activeDialog === 3 && (
        <div className="dialog px-5 mx-5">
          <div className="dialog-content">
            <p>Cuadro de diálogo de la Sección 3</p>
          </div>
        </div>
      )}

      {activeDialog === 4 && (
        <div className="dialog px-5 mx-5">
          <div className="dialog-content">
            <p>Cuadro de diálogo de la Sección 4</p>
          </div>
        </div>
      )}
    </div>

      {/************ COMPARATION TABLE **************/}
      <section className="row p-5 m-5">
        <AirfryerComparisonTable
          infoClick={() => scrollToSection("second-navbar")}
        />
      </section>
      {/******** accessories ********/}
      <section id="accessories" className="row align-items-center p-5 pb-0">
        <div className="d-flex">
          {accessories.map((accesory) => (
            <div
              key={accesory.id}
              className="text-center px-3 col-3"
              onClick={() => scrollToSection("second-navbar")}
            >
              <Link
                to={`/accessories/${accesory.name}/${accesory.id}`}
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