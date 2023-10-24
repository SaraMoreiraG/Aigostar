import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AddToCartButton from "./AddToCartButton/AddToCartButton";

function AirfryerComparisonTable({ infoClick }) {
  // Get the list of airfryers and cart items from the Redux store
  const airfryers = useSelector((state) => state.airfryers);
  const cartItems = useSelector((state) => state.cart);

  // Get the names for the table
  const detailNames = airfryers[0].detailsSmall.map((detail) => detail.name);

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
            <th className="align-middle">Modelo</th>
            {airfryers.map((airfryer) => (
              <th key={airfryer.id} className="align-middle col-3">
                <div className="d-flex justify-content-center">
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
                <AddToCartButton
                    item={{id: airfryer.id,
                          img: airfryer.thumbnails[0],
                          name: airfryer.name,
                          price: airfryer.price,
                          quantity: 1}}
                    style="table-btn" />
                    </div>
              </th>
            ))}
          </tr>
        </thead>
        {/* Display the airfryer details */}
        <tbody>
          {detailNames.map((name, index) => (
            <tr key={index}>
              <td>{name}</td>
              {airfryers.map((airfryer) => (
                <td key={airfryer.name} className="text-center">
                  {airfryer.detailsSmall[index].name === "Funciones" ? (
                    airfryer.detailsSmall[index].size.length > 1 ? (
                      airfryer.detailsSmall[index].size.length
                    ) : (
                      <i className="fa-solid fa-x"></i>
                    )
                  ) : airfryer.detailsSmall[index].name === "Programas" ? (
                    airfryer.detailsSmall[index].size != 0 ? (
                      airfryer.detailsSmall[index].size
                    ) : (
                      <i className="fa-solid fa-x"></i>
                    )
                  ) : (
                    airfryer.detailsSmall[index].size
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td>Precio</td>
            {airfryers.map((airfryer) => (
              <td key={airfryer.id} className="text-center">{airfryer.price}€</td>
            ))}
          </tr>
          {/* Buttons */}
          <tr>
            <td></td>
            {airfryers.map((airfryer) =>(
                <td key={airfryer.id} className="text-center">

                      <Link
                        to={`/airfryers/${airfryer.name}/${airfryer.id}`}
                        className="no-underline"
                        onClick={handleInfoClick}
                      >
                        <button className="btn-orange"> + info</button>
                      </Link>

                </td>
              )
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AirfryerComparisonTable;
