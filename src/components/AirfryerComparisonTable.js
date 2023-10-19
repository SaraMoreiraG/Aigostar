import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AddToCartButton from "./AddToCartButton/AddToCartButton";

function AirfryerComparisonTable({ infoClick }) {
   // Get the list of airfryers and cart items from the Redux store
  const airfryers = useSelector((state) => state.airfryers);
  const cartItems = useSelector((state) => state.cart);

  // Function to handle the "info" button click
  const handleInfoClick = () => {
    infoClick();
  };
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        {/* Display the airfryer image */}
        <thead>
          <tr className="text-center">
            <th className="align-middle col-2">Modelo</th>
            {airfryers.map((airfryer) => (
              <th key={airfryer.id} className="align-middle col-3">
                <Link
                  to={`/airfryers/${airfryer.name}/${airfryer.id}`}
                  className="no-underline"
                  onClick={handleInfoClick}
                >
                  <div>
                    <img
                      src={airfryer.imgtable}
                      alt={airfryer.name}
                      width="80"
                      height="80"
                    />
                    <p className="m-0 mt-2">{airfryer.name}</p>
                  </div>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        {/* Display the airfryer details */}
        <tbody>
          <tr>
            <td>Capacidad</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.capacidad} L</td>
            ))}
          </tr>
          <tr>
            <td>Comensales</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.comensales}</td>
            ))}
          </tr>
          <tr>
            <td>Bandeja Antiadherente</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.bandejaantihaderente}</td>
            ))}
          </tr>
          <tr>
            <td>Control</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.control}</td>
            ))}
          </tr>
          <tr>
            <td>Funciones</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>
                {Array.isArray(airfryer.details.funciones) ? (
                  airfryer.details.funciones.join(" | ")
                ) : (
                  <i className="fa-solid fa-x"></i>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td>Programas</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>
                {airfryer.details.programas === 0 ? (
                  <i className="fa-solid fa-x"></i>
                ) : (
                  airfryer.details.programas
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td>Temporizador</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.temporizador} min</td>
            ))}
          </tr>
          <tr>
            <td>Temperatura Máxima</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.temperaturamax} °C</td>
            ))}
          </tr>
          <tr>
            <td>Temperatura Mínima</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.temperaturamin} °C</td>
            ))}
          </tr>
          <tr>
            <td>Potencia</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.potencia} W</td>
            ))}
          </tr>
          <tr>
            <td>Ancho (mm)</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.ancho} mm</td>
            ))}
          </tr>
          <tr>
            <td>Alto (mm)</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.alto} mm</td>
            ))}
          </tr>
          <tr>
            <td>Fondo (mm)</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.fondo} mm</td>
            ))}
          </tr>
          <tr>
            <td>Peso (kg)</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.details.peso} kg</td>
            ))}
          </tr>
          <tr>
            <td>Precio</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id}>{airfryer.price} €</td>
            ))}
          </tr>
          <tr>

          {/* Buttons */}
          <td></td>
            {airfryers.map((airfryer) => {
              // Extract data for each airfryer
              const { id, thumbnails, name, price, quantity } = airfryer;

              // Check if the airfryer is already in the cart
              const isInCart = cartItems.some((item) => item.id === airfryer.id);

              // Create an 'item' object for the AddToCartButton
              const item = {
                id: id,
                img: thumbnails[0],
                name: name,
                price: price,
                quantity: quantity,
              };

              return (
                <td key={airfryer.id}>
                  <div className="row">
                    <div className="d-flex col-7 justify-content-end p-0">
                      <Link
                        to={`/airfryers/${airfryer.name}/${airfryer.id}`}
                        className="no-underline"
                        onClick={handleInfoClick}
                      >
                        <button className="btn-orange"> + info</button>
                      </Link>
                    </div>
                    {/* Display the AddToCartButton component */}
                    <div className="d-flex justify-content-end pe-4 col-5">
                      <AddToCartButton
                        item={item}
                        style="table-btn"
                      />
                    </div>
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AirfryerComparisonTable;
