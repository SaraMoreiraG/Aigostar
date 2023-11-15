import React from "react";
import { useSelector } from "react-redux";

function Recipes() {
	const recipes = useSelector((state) => state.recipes);

  return (
    <section id="recipes" className="row text-center p-5 pb-0">
      <h1 className="mb-0">Recetas</h1>
      <div className="d-flex justify-content-center">
        <hr></hr>
      </div>
      <div className="row px-5">
      {recipes.map((recipe) => (
        <div key={recipe.name} className="col-md-4 col-12 text-start p-3">
          <img src={recipe.img} alt="receta" className="img-fluid mb-4" />
          <div className="d-flex align-items-center mb-3">
            <i className="fa-regular fa-clock me-2"></i>
            <span className="icon-text me-3">{recipe.tiempoPreparacion}</span>
            <i className="fa-regular fa-user me-2"></i>
            <span className="icon-text">{recipe.numComensales}</span>
          </div>
          <h2>{recipe.title}</h2>
          <p>
            {recipe.description}
          </p>
        </div>
        ))}
      </div>
    </section>
  );
}

export default Recipes;
