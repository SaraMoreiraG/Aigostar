import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { scrollToSection } from "../utils/scrollUtils";
import ImageGallery from "./ImageGallery/ImageGallery";
import AddToCartButton from "./AddToCartButton/AddToCartButton";
import AirfryerComparisonTable from "./AirfryerComparisonTable";
import Accesories from "./Accesories";
import Recipes from "./Recipes"

function ProductDetails() {
  // Get route parameters
  const { category, name, id } = useParams();

  // Initialize states
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Azul");
  const [selectedSize, setSelectedSize] = useState("small");

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
  const [item, setItem] = useState({
    id: parseInt(id, 10),
    img: categoryData[id]?.thumbnails.principals[0],
    name: name,
    price: categoryData[id]?.price,
    quantity: quantity,
    category: categoryData[id]?.category,
    color: '',
    size: ''
  });
  console.log("product detail item: ", item)

  useEffect(() => {
    if(item.category === 'accessories'){
      setItem((prevItem) => ({
        ...prevItem,
        color: selectedColor,
        size: selectedSize
      }))
    }
  }, [selectedColor, selectedSize, item.category])
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

  // Función para resaltar palabras clave
  const highlightKeywords = (text) => {
    const keywords = [
      "freidora de aire y Horno",
      "bandeja reutilizable",
      "recetas de forma saludable y sin aceite.",
    ];

    // Usamos expresiones regulares para encontrar y reemplazar las palabras clave
    const regex = new RegExp(keywords.join("|"), "gi"); // "gi" significa global e insensible a mayúsculas y minúsculas

    // Reemplazamos las palabras clave con etiquetas <strong> para aplicar la negrita
    return text.replace(regex, (match) => `<strong>${match}</strong>`);
  };

  return (
    <>
      {/************ SECOND NAVBAR **************/}
      <section className="d-flex my-3 px-3 mx-3" id="second-navbar">
        <Link to="/#home" className="second-navbar">
          <i className="fa-solid fa-house me-1"></i> Inicio &nbsp; {">"} &nbsp;
        </Link>
        {category === "airfryers" ? (
          <Link to="/airfryers" className="second-navbar">
            Freidoras de aire &nbsp; {">"} &nbsp;
          </Link>
        ) : (
          <Link to="/accesorios" className="second-navbar">
            Accesorios &nbsp; {">"} &nbsp;
          </Link>
        )}
        <span className="second-navbar" href="">
          {name}
        </span>
      </section>
      {/************ GALLERY AND PRODUCT DETAILS **************/}
      <section className="row align-items-center p-5" id="product">
        <section className="col-lg-6 col-md-12">
          <ImageGallery
            images={categoryData[id].thumbnails}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
          />
        </section>
        {/**** PRODUCT DETAILS ****/}
        <section className="col-lg-5 col-md-12">
          <h2>{categoryData[id].title}</h2>
          <div className="my-3">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <span> {categoryData[id].estadisticas.puntuacion}</span>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: highlightKeywords(categoryData[id].description),
            }}
          ></p>
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
              {categoryData[id].sizes && (
                <>
                  <p className="mb-0">
                    <strong>Elige el tamaño de tu feridora:</strong>
                  </p>
                  <div className="d-flex">
                    <div
                      className={`select-size my-3 p-2 col-3 ${
                        selectedSize === "small" ? "active" : ""
                      }`}
                      onClick={() => setSelectedSize("small")}
                    >
                      <div className="d-flex col-12">
                        <img
                          className="img-fluid col-6"
                          src="https://aigostar-img.s3.amazonaws.com/hayden-A/haydenA-table.png"
                          alt="Freidoras de aire de 3 y 4L"
                        />
                        <img
                          className="img-fluid col-6"
                          src="https://aigostar-img.s3.amazonaws.com/hayden-x/haydenX-table.png"
                          alt="Freidora de aire de 5L"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <div className="text-center mt-2 col-9">
                          <span>3L, 4L y 5L</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`select-size my-3 ms-3 p-2 col-3 ${
                        selectedSize === "big" ? "active" : ""
                      }`}
                      onClick={() => setSelectedSize("big")}
                    >
                      <div className="d-flex justify-content-center col-12">
                        <img
                          className="col-6"
                          src="https://aigostar-img.s3.amazonaws.com/cube-smart/cube-smart-table.png"
                          alt="Freidoras de aire 6 y 7L"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <div className="text-center mt-2 col-9">
                          <span>6L y 7L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* Set color */}
              {categoryData[id].thumbnails.colors && (
                <>
                  <p className="mt-3 mb-0">Color: {selectedColor}</p>
                  <div className="d-flex">
                    {categoryData[id].thumbnails.colors &&
                      categoryData[id].thumbnails.colors.map(
                        (color, index) =>
                          color.size === selectedSize && (
                            <div
                              key={index}
                              className={`select-color my-3 p-2 col-3 ${
                                selectedColor === color.showName ? "active" : ""
                              }`}
                              onClick={() => setSelectedColor(color.showName)}
                            >
                              <div className="d-flex justify-content-center col-12">
                                <img
                                  className="col-6"
                                  src={color.url}
                                  alt={color.showName}
                                />
                              </div>
                            </div>
                          )
                      )}
                  </div>
                </>
              )}
            </>
          )}
          <h2 className="price my-3">{categoryData[id].price}€</h2>
          <div className="row align-items-end">
            {/** QUANTITY **/}
            <div className="col-3">
              <p className="fw-bold">Cantidad: {quantity}</p>
              <div className="quantity d-flex mb-3">
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
            <div className="mb-3 col-8">
              <AddToCartButton
                item={item}
                type="btn-orange icon-button moving"
              />
            </div>
          </div>
          {/** BUY BUTTON **/}
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-6 col-11">
              <button className="btn-buy icon-button w-100">
                <i className="fa-regular fa-credit-card"></i>
                Comprar ahora
              </button>
            </div>
            <div className="d-flex align-items-center ps-2 ms-1 mt-1 col-sm-3 col-12">
              <i className="fa-brands fa-cc-visa me-1"></i>
              <i className="fa-brands fa-cc-mastercard me-1"></i>
              <i className="fa-brands fa-cc-amex"></i>
            </div>
          </div>
        </section>
      </section>

      {/************ DIALOG TITLE **************/}
      <div className="my-5">
        <div className="especifications row g-3 px-5 mx-5">
          <div className="d-flex justify-content-center col-md-3 col-sm-12">
            <h5
              onClick={() => openDialog(1)}
              className={activeDialog === 1 ? "active" : ""}
            >
              Descripción
            </h5>
          </div>
          <div className="d-flex justify-content-center col-md-3 col-sm-12">
            <h5
              onClick={() => openDialog(2)}
              className={activeDialog === 2 ? "active" : ""}
            >
              Detalles
            </h5>
          </div>
          <div className="d-flex justify-content-center col-md-3 col-sm-12">
            <h5
              onClick={() => openDialog(3)}
              className={activeDialog === 3 ? "active" : ""}
            >
              Valoraciones
            </h5>
          </div>
          <div className="d-flex justify-content-center col-md-3 col-sm-12">
            <h5
              onClick={() => openDialog(4)}
              className={activeDialog === 4 ? "active" : ""}
            >
              Freidoras de Aire
            </h5>
          </div>
        </div>
        <div className="px-5 mx-5">
          <div className="mx-5">
            <hr className="grey-line"></hr>
          </div>
        </div>

        {/**** CUADROS DE DIALOGO ****/}
        {activeDialog === 1 && (
          <div className="dialog d-flex justify-content-center pt-3">
            <div className="dialog-content col-12 px-3">
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
          <div className="dialog">
            <div className="dialog-content row g-2 pt-3">
              {category === "accessories" ? (
                // Si la categoria es accesorios, muestra la tabla completa
                <table className="col-6">
                  <tbody>
                    {selectedSize === "small"
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
                  <div className="d-flex justify-content-center col-sm-6 col-12">
                    <table className="col-10">
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
                  <div className="d-flex justify-content-center col-sm-6 col-12">
                    <table className="col-10">
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
          <div className="dialog">
            <div className="dialog-content row g-2 p-3">
              <div className="text-center col-lg-3 col-md-5 col-sm-6">
                <img
                  src={categoryData[id].estadisticas.img}
                  className="img-fluid"
                  alt="Opiniones de Amazon"
                />
                <span>
                  Más de {categoryData[id].estadisticas.vendidos} productos
                  vendidos y {categoryData[id].estadisticas.valoraciones}{" "}
                  valoraciones en Amazon
                </span>
              </div>
              <div className="col-md-5 col-sm-11">
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

        {activeDialog === 4 && (
          <div className="dialog">
            <div className="dialog-content py-3">
              <div className="col-9">
                <AirfryerComparisonTable
                  infoClick={() => scrollToSection("second-navbar")}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/******** ACCESSORIES ********/}
      <Accesories />

      {/******** RECEIPES ********/}
      <Recipes />
    </>
  );
}

export default ProductDetails;
