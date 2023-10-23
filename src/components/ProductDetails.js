import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { scrollToSection } from "../utils/scrollUtils";
import ImageGallery from "./ImageGallery/ImageGallery";
import AddToCartButton from "./AddToCartButton/AddToCartButton";
import AirfryerComparisonTable from "./AirfryerComparisonTable";
import ProductCard from "./ProductCard/ProductCard";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

function ProductDetails() {
  // Get route parameters
  const { category, name, id } = useParams();

  // Initialize states
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("smallBlue");
  const [isSmall, setIsSmall] = useState(true);
  const [selectedSize, setSelectedSize] = useState("4L");

  // Access accessories data from Redux store
  const accessories = useSelector((state) => state.accessories);

  // Determine the product based on the route parameter 'category'
  const categoryData = useSelector((state) => {
    if (category === "airfryers") {
      return state.airfryers;
    } else if (category === "accessories") {
      return accessories; // Use the accessories data
    }
    return null; // Handle the case where the category is not found
  });

  // Create an item object for the cart
  const item = {
    id: parseInt(id, 10),
    img: categoryData[id]?.thumbnails[0],
    name: name,
    price: categoryData[id]?.price,
    quantity: quantity,
  };

  // Function to handle changes in the quantity
  const handleQuantityChange = (change) => {
    if (quantity + change >= 1) {
      setQuantity((prevQuantity) => prevQuantity + change);
    }
  };

  // State to control the visibility of dialog boxes
  const [activeDialog, setActiveDialog] = useState(1);

  // Function to open a dialog box
  const openDialog = (dialogNumber) => {
    setActiveDialog(dialogNumber);
  };

  // Scroll to the top of the page on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/************ SECOND NAVBAR **************/}
      <section className="d-flex my-3 px-5 mx-5" id="second-navbar">
        <Link to="/#home" className="second-navbar">
          Inicio &nbsp; {">"} &nbsp;
        </Link>
        {category === "airfryers" ? (
          <Link to="/#airfryers" className="second-navbar">
            Freidoras de aire &nbsp; {">"} &nbsp;
          </Link>
        ) : (
          <a
            className="second-navbar"
            onClick={(event) => {
              event.preventDefault(); // Prevent the default navigation behavior
              scrollToSection("accessories");
            }}
          >
            Accesorios &nbsp; {">"} &nbsp;
          </a>
        )}
        <a className="second-navbar">{name}</a>
      </section>
      {/************ GALLERY AND PRODUCT DETAILS **************/}
      <section className="row p-5" id="product">
        <section className="col-6">
          <ImageGallery
            images={categoryData[id].thumbnails}
            selectedColor={selectedColor}
          />
        </section>
        {/**** PRODUCT DETAILS ****/}
        <section className="col-5">
          <h2>{categoryData[id].title}</h2>
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
                {categoryData[id].detailsSmall[0].name}:{" "}
                {categoryData[id].detailsSmall[0].size}
              </p>
              <p className="m-0">
                {categoryData[id].detailsSmall[1].name}:{" "}
                {categoryData[id].detailsSmall[1].size} personas
              </p>
              <p className="m-0">
                {categoryData[id].detailsSmall[3].name}:{" "}
                {categoryData[id].detailsSmall[3].size}
              </p>
              <p>
                {categoryData[id].detailsSmall[6].name}:{" "}
                {categoryData[id].detailsSmall[6].size}utos
              </p>
            </>
          ) : (
            <>
              {/* Set Size */}
              {categoryData[id].thumbnails.colors && (
                <div className="d-flex">
                  <div
                    className={`select-size p-2 col-4 ${
                      selectedSize == "4L" ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize("4L")}
                  >
                    <div className="d-flex col-12">
                      <img
                        className="img-fluid col-6"
                        src="https://aigostar-img.s3.amazonaws.com/hayden-A/haydenA-table.png"
                      />
                      <img
                        className="img-fluid col-6"
                        src="https://aigostar-img.s3.amazonaws.com/hayden-x/haydenX-table.png"
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="text-center mt-2 col-9">
                        <span>Freidoras de aire de 3L, 4L y 5L</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`select-size ms-3 p-2 col-4 ${
                      selectedSize == "7L" ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize("7L")}
                  >
                    <div className="d-flex justify-content-center col-12">
                      <img
                        className="col-6"
                        src="https://aigostar-img.s3.amazonaws.com/cube-smart/cube-smart-table.png"
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="text-center mt-2 col-9">
                        <span>Freidoras de aire de 6L y 7L</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Set color */}
              <div className="row d-flex">
                {categoryData[id].thumbnails.colors &&
                  categoryData[id].thumbnails.colors.map(
                    (color, index) =>
                      color.size === selectedSize && (
                        <div
                          key={index}
                          className={`select-size ms-3 p-2 col-4 ${
                            selectedColor == color.name ? "active" : ""
                          }`}
                          onClick={() => setSelectedColor(color.name)}
                        >
                          <div className="d-flex justify-content-center col-12">
                            <img className="col-6" src={color.url} />
                          </div>
                          <div className="d-flex justify-content-center">
                            <div className="text-center mt-2 col-9">
                              <span>{color.showName}</span>
                            </div>
                          </div>
                        </div>
                      )
                  )}
              </div>
            </>
          )}
          <h2 className="price my-3">{categoryData[id].price}€</h2>
          <div className="d-flex align-items-end">
            {/** QUANTITY **/}
            <div className="col-4">
              <p className="fw-bold">Cantidad: {quantity}</p>
              <div className="quantity d-flex mb-3 col-8">
                <p
                  className="quantity-text"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </p>
                <p>{quantity}</p>
                <p
                  className="quantity-text"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </p>
              </div>
            </div>
            {/** CART BUTTON **/}
            <div className="mb-3">
              <AddToCartButton
                item={item}
                style="btn-orange icon-button moving"
              />
            </div>
          </div>
          {/** BUY BUTTON **/}
          <div className="d-flex col-12">
            <button className="btn-buy icon-button w-100">
              <i className="fa-regular fa-credit-card"></i>
              Comprar ahora
            </button>
            <div className="d-flex align-items-center ps-2">
              <i className="fa-brands fa-cc-visa me-1"></i>
              <i className="fa-brands fa-cc-mastercard me-1"></i>
              <i className="fa-brands fa-cc-amex"></i>
            </div>
          </div>
        </section>
      </section>

      {/************ ESPECIFICATIONS **************/}
      <div className="my-5">
        <div className="especifications px-5 mx-5">
          <h5
            onClick={() => openDialog(1)}
            className={activeDialog === 1 ? "active" : ""}
          >
            Descripción
          </h5>
          <h5
            onClick={() => openDialog(2)}
            className={activeDialog === 2 ? "active" : ""}
          >
            Detalles
          </h5>
          <h5
            onClick={() => openDialog(3)}
            className={activeDialog === 3 ? "active" : ""}
          >
            Valoraciones
          </h5>
          <h5
            onClick={() => openDialog(4)}
            className={activeDialog === 4 ? "active" : ""}
          >
            Freidoras de Aire
          </h5>
        </div>
        <div className="px-5 mx-5">
          <hr className="grey-line m-2"></hr>
        </div>

        {/**** CUADROS DE DIALOGO ****/}
        {activeDialog === 1 && (
          <div className="dialog d-flex justify-content-center pt-3 px-5 mx-5">
            <div className="dialog-content col-8 px-3">
              <ul>
                {categoryData[id].descriptionDetails.map((item, index) => {
                  if (index % 2 === 0) {
                    // Elemento par (título)
                    return <h5 key={index}>{item}</h5>;
                  } else {
                    // Elemento impar (párrafo)
                    return (
                      <p className="mb-4" key={index}>
                        {item}
                      </p>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        )}

        {activeDialog === 2 && (
          <div className="dialog px-5 mx-5">
            <div className="dialog-content p-3">
              {category === "accessories" ? (
                // Si la categoria es accesorios, muestra la tabla completa
                <table className="col-6">
                  <tbody>
                    {isSmall
                      ? categoryData[id].detailsSmall.map((detail, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "even" : "odd"}
                          >
                            <td className="col-8 p-2">{detail.name}</td>
                            <td className="text-end p-2 col-4">
                              {detail.size}
                            </td>
                          </tr>
                        ))
                      : categoryData[id].detailsBig.map((detail, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "even" : "odd"}
                          >
                            <td className="col-8 p-2">{detail.name}</td>
                            <td className="text-end p-2 col-4">
                              {detail.size}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              ) : (
                // Si la categoria es AIRFRYERS, muestra 2 tablas
                <>
                  <div className="d-flex justify-content-end pe-3 col-6">
                    <table className="col-8">
                      <tbody>
                        {categoryData[id].detailsSmall
                          .slice(0, 7)
                          .map((detail, index) => (
                            <tr
                              key={index}
                              className={index % 2 === 0 ? "even" : "odd"}
                            >
                              <td className="col-6 p-2">{detail.name}</td>
                              <td className="text-end p-2 col-6">
                                {detail.size}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-start ps-3 col-6">
                    <table className="col-8">
                      <tbody>
                        {categoryData[id].detailsSmall
                          .slice(7)
                          .map((detail, index) => (
                            <tr
                              key={index}
                              className={index % 2 === 0 ? "even" : "odd"}
                            >
                              <td className="col-6 p-2">{detail.name}</td>
                              <td className="text-end p-2 col-6">
                                {detail.size}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeDialog === 3 && (
          <div className="dialog px-5 mx-5">
            <div className="dialog-content p-3">
              <div className="text-center col-4 px-5">
                <img
                  src={categoryData[id].estadisticas.img}
                  className="img-fluid"
                />
                <span>
                  Más de {categoryData[id].estadisticas.vendidos} productos
                  vendidos y {categoryData[id].estadisticas.valoraciones}{" "}
                  valoraciones en Amazon
                </span>
              </div>
              <div className="col-6">
                {categoryData[id].reviews.map((detail, index) => (
                  <div key={index}>
                    <div className="d-flex">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <h5 className="ms-2">{detail.title}</h5>
                    </div>
                    <p>{detail.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeDialog === 4 && <div className="dialog px-5 mx-5"></div>}
      </div>

      {/************ COMPARATION TABLE **************/}
      <section className="row px-5 mx-5">
        <AirfryerComparisonTable
          infoClick={() => scrollToSection("second-navbar")}
        />
      </section>

      {/******** ACCESSORIES ********/}
      <section
        id="accessories"
        className="row align-items-center text-center m-5 p-5 pb-0"
      >
        <h1 className="mb-0">Te puede interesar:</h1>
        <div className="d-flex justify-content-center">
          <hr></hr>
        </div>
        <div className="d-flex">
          {accessories.map((accesory) => (
            <div
              key={accesory.id}
              className="text-center p-3 col-3"
              onClick={() => scrollToSection("second-navbar")}
            >
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
    </>
  );
}

export default ProductDetails;
