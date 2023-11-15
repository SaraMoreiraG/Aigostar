import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard/ProductCard";

function Airfryers() {
  const airfryers = useSelector((state) => state.airfryers);

  return (
    <section
      id="airfryers"
      className="row align-items-center text-center p-5 pb-0"
    >
      <h1 className="my-0">Freidoras de Aire</h1>
      <div className="d-flex justify-content-center">
        <hr></hr>
      </div>
      <div className="carrousel d-flex py-4 col-12">

      <div className="col-md-3 col-sm-7 col-8 me-2">
        <img
          src="https://aigostar-img.s3.amazonaws.com/woman.jpg"
          alt="aigostar airfryer"
        />
      </div>
        {airfryers.map((airfryer) => (
          <div key={airfryer.id} className="text-center px-3 col-md-3 col-sm-7 col-8">
            <Link
              to={`/airfryers/${airfryer.name}/${airfryer.id}`}
              className="no-underline"
            >
              <ProductCard product={airfryer} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Airfryers;
