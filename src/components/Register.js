import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="px-5 mx-5" id="register">
      {/************ SECOND NAVBAR **************/}
      <section className="d-flex my-3 px-5 mx-5" id="second-navbar">
        <Link to="/#home" className="second-navbar">
          <i className="fa-solid fa-house me-1"></i> Inicio &nbsp; {">"} &nbsp;
        </Link>
        <Link to="/" className="second-navbar">
          <i className="fa-solid fa-house me-1"></i> Acceso
        </Link>
      </section>
      <div className="px-5 mx-5 w-80">
        <hr className="grey-line"></hr>
      </div>
	  {/************** FORM REGISTER ***************/}
      <div className="row justify-content-center text-center px-5 mx-5">
        <h2 className="my-5">Formulario de Registro</h2>
        <div className="row text-start col-6">
          <label htmlFor="email" className="mb-3 ms-0 ps-0">
            Email *
          </label>
          <br />
          <input type="email" className="mb-4"></input>

          <label htmlFor="password" className="mb-3 ms-0 ps-0">
            Contraseña *
          </label>
          <br />
          <input type="password" className="mb-4"></input>

          <label htmlFor="password" className="mb-3 ms-0 ps-0">
            Confirmar contraseña *
          </label>
          <br />
          <input type="password" className="mb-4"></input>

          <button className="btn-orange mb-4">Regístrate</button>
          <div className="text-center">
            <Link to="/login" className="btn-login">
              <span>O spanCCEDE</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
