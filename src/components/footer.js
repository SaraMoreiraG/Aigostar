function Footer() {
  return (
    <>
      <div className="row justify-content-center align-items-end p-5" id="footer">
        <div className="col-3">
          <p>Aigostar Cooking</p>
          <p>Empresa distribuidora de freidoras de aire de la marca Aigostar y productos relacionados de diferentes marcas</p>
          <p>Email: aigostarcooking@gmail.com</p>
          <div>
            <i className="fa-brands fa-facebook"></i>
          </div>
        </div>
        <div className="col-2">
          <p>Freidoras de aire</p>
          <p>Accesorios</p>
          <p>Recetas</p>
        </div>
        <div className="col-2">
          <p>Mi cuenta</p>
          <p>Pedidos</p>
          <p>Favoritos</p>
        </div>
        <div className="col-3">
          <p>Get E-mail updates about our latest shop and special offers.</p>
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
