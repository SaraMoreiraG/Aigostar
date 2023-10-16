function Footer() {
  return (
    <>
      <div className="row justify-content-center p-5" id="footer">
        <div className="col-3">
          <p>Address: 60-49 Road 11378 New York</p>
          <p>Phone: +65 11.188.888</p>
          <p>Email: hello.colorlib@gmail.com</p>
          <div>
            <i className="fa-brands fa-facebook"></i>
          </div>
        </div>
        <div className="col-2">
          <p>Information</p>
          <p>About us</p>
          <p>Checkout</p>
          <p>Contact</p>
        </div>
        <div className="col-2">
          <p>My Account</p>
          <p>My Account</p>
          <p>Pedidos</p>
          <p>Carrito compra</p>
        </div>
        <div className="col-3">
          <p>Join Our Newsletter Now</p>
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
