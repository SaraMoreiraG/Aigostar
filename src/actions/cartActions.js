// Acción para eliminar un artículo del carrito
export const removeFromCart = (itemId) => {
  return (dispatch, getState) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: itemId,
    });

    // Obtén el carrito actualizado del estado de Redux
    const updatedCart = getState().cart;

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
  };
};


// Acción para agregar un artículo al carrito y actualizar el almacenamiento local
export const addToCart = (item) => {
  return (dispatch, getState) => {
    const { cart } = getState();
    const itemExists = cart.find((cartItem) => cartItem.id === item.id);

    // Si el artículo ya está en el carrito, elimínalo
    if (itemExists) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: item,
      });
    }

    // Obtén el carrito actualizado del estado de Redux
    const updatedCart = getState().cart;

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
  };
};

// Acción para cargar el carrito desde el almacenamiento local al inicio de la aplicación
export const loadCartFromLocalStorage = () => {
  return (dispatch) => {
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      const cartData = JSON.parse(storedCartData);

      // Limpia el carrito actual antes de cargar desde el almacenamiento local
      dispatch({ type: "CLEAR_CART" });

      // Agrega los elementos del almacenamiento local al carrito en Redux
      cartData.forEach((item) => {
        dispatch(addToCart(item));
      });
    }
  };
};

