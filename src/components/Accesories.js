import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard/ProductCard";

function Accesories() {
	const accessories = useSelector((state) => state.accessories);

  return (
	<section
	id="accessories"
	className="row align-items-center p-5 pb-0"
  >
	<div className="carrousel d-flex">
	  {accessories.map((accesory) => (
		<div key={accesory.id} className="text-center px-3 col-md-3 col-sm-5 col-8">
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
  )
}

export default Accesories
