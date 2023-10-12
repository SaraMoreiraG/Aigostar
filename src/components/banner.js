import offer from '../assets/images/haydenA-1.jpg'

function Banner() {
  return (
    <div className="row m-5 mb-0 p-5" id="banner">
      <div className="text-center col-6">
        <h1 className="mb-0">Oferta de la semana</h1>
        <div className="d-flex justify-content-center">
          <hr></hr>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do ipsum
          dolor sit amet, consectetur adipisicing elit
        </p>
        <p className="price">60€</p>
        <button className="btn-orange mt-4">Comprar ahora</button>
      </div>
	  <div className='col-5 p-5'>
		<img src={offer} alt='airfryer oferta' className='img-fluid' />
	  </div>
    </div>
  );
}

export default Banner;
