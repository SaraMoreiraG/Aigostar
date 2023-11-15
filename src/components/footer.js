import { Link } from "react-router-dom";
import logo from "../assets/images/logo-black.png";

function Footer() {
  return (
    <>
      <div className="row g-3 justify-content-center align-items-start p-5" id="footer">
        <div className="row">
        <div className="col-md-8 col-sm-5 col-8 p-3">
        <Link to="/">
          <img src={logo} alt="aigostar logo" className="img-fluid" />
        </Link>
      </div>
        </div>
        <div className="col-lg-3 col-md-5">
          <p>Empresa distribuidora de freidoras de aire de la marca Aigostar y productos relacionados de diferentes marcas</p>
          <p>Email: aigostarcooking@gmail.com</p>
          <div>
            <i className="fa-brands fa-facebook"></i>
          </div>
        </div>
        <div className="col-lg-2 col-md-3">
          <Link to="/airfryers" className="footer-link">
          <p>Freidoras de aire</p>
          </Link>
          <Link to="/accesorios" className="footer-link">
          <p>Accesorios</p>
          </Link>
          <Link to="/recetas" className="footer-link">
          <p>Recetas</p>
          </Link>
        </div>
        <div className="col-lg-2 col-md-3">
          <p>Mi cuenta</p>
          <p>Pedidos</p>
          <Link to="/shopping-cart" className="footer-link">
          <p>Favoritos</p>
          </Link>
        </div>
        <div className="col-lg-2 col-md-11">
        <p>Recibe las últimas noticias y ofertas en tu E-mail.</p>
          <div>
            <input type="email" />
            <button className="btn-orange">Suscribete</button>
          </div>
        </div>
      </div>
      <div className="row text-center py-2">
        <span>
          Web desarrollada por{" "}
          <a href="https://www.linkedin.com/in/sara-moreira-g" target="blank">
            SaraMorDev
          </a>
        </span>
      </div>
    </>
  );
}

export default Footer;
