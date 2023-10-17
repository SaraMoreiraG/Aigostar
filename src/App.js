import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/configureStore";

import NavBar from "./components/NavBar/NavBar.js"
import Home from "./components/home";

import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:name/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
