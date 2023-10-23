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
    <div className="table-responsive mx-5">
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
          {/* Buttons */}
          <tr>
            <td></td>
            {airfryers.map((airfryer) => {
              // Extract data for each airfryer
              const { id, thumbnails, name, price, quantity } = airfryer;

              // Check if the airfryer is already in the cart
              const isInCart = cartItems.some(
                (item) => item.id === airfryer.id
              );

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
                      <AddToCartButton item={item} style="table-btn" />
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
