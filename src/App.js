import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import store from "./store/configureStore";
import { loadCartFromLocalStorage } from './actions/cartActions';
import { loadUserFromLocalStorage } from "./actions/userActions";

import NavBar from "./components/NavBar/NavBar.js"
import Home from "./components/home";
import ProductDetails from "./components/ProductDetails";
import Register from "./components/Register";
import Login from "./components/Login";
import ShoppingCart from "./components/ShoppingCart";
import Footer from "./components/Footer"

// Nuevo componente funcional para cargar datos iniciales
function InitialDataLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Cargar datos de usuario desde el almacenamiento local u otra fuente
    const userData = localStorage.getItem("userData");
    if (userData) {
      // Analizar y despachar una acción para establecer los datos de usuario en Redux
      dispatch(loadUserFromLocalStorage(JSON.parse(userData)));
    }

    // Cargar carrito desde el almacenamiento local
    const cartData = localStorage.getItem("cartData");
    if (cartData) {
      // Analizar y despachar una acción para establecer el carrito en Redux
      dispatch(loadCartFromLocalStorage(JSON.parse(cartData)));
    }
  }, [dispatch]);

  return null; // No renderiza contenido
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/#airfryers" element={<Home />} />
          <Route path="/:category/:name/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          {/* <Route path="/#second-navbar/:category/:name/:id" element={<ProductDetails />} /> */}
        </Routes>
        <InitialDataLoader />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
