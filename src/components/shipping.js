function Shipping() {
  return (
    <div className="row mx-5 p-5">
        <div className="shipping d-flex justify-content-center align-items-center py-4 col-4">
          <i class="fa-solid fa-truck-moving"></i>
          <div>
            <h5 className="mb-0">FREE SHIPPING</h5>
            <p className="mb-0">For all order over 99$</p>
          </div>
        </div>
		<div className="shipping d-flex justify-content-center align-items-center py-4 col-4">
		<i class="fa-regular fa-clock"></i>
          <div>
            <h5 className="mb-0">DELIVERY ON TIME</h5>
            <p className="mb-0">If good have prolems</p>
          </div>
        </div>
		<div className="shipping d-flex justify-content-center align-items-center py-4 col-4">
		<i class="fa-regular fa-credit-card"></i>
          <div>
            <h5 className="mb-0">SECURE PAYMENT</h5>
            <p className="mb-0">100% secure payment</p>
          </div>
        </div>
    </div>
  );
}

export default Shipping;
