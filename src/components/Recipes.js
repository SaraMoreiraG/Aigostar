import React from 'react'

function Recipes() {
  return (
	<section
	id="recipes"
	className="row text-center p-5 pb-0"
  >
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
  )
}

export default Recipes
