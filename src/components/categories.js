import cat1 from "../assets/images/cat1.jpg";

function Categories() {
  return (
    <div className="row p-5 pb-0">
      <div className="cat1 col-4 p-3">
          <img
            src={cat1}
            alt="airfryer o freidora de aire"
            className="img-fluid"
          />
          <div class="overlay">
            <div class="text">Airfryer</div>
          </div>
        </div>
      <div className="cat1 col-4 p-3">
        <img
          src={cat1}
          alt="airfryer o freidora de aire"
          className="img-fluid"
        />
        <div class="overlay">
          <div class="text">Accesorios</div>
        </div>
      </div>
      <div className="cat1 col-4 p-3">
        <img
          src={cat1}
          alt="airfryer o freidora de aire"
          className="img-fluid"
        />
        <div class="overlay">
          <div class="text">Repuestos</div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
