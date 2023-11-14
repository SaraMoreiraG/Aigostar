import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard/ProductCard";

function Airfryers() {
  const airfryers = useSelector((state) => state.airfryers);

  return (
    <section
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
  );
}

export default Airfryers;
