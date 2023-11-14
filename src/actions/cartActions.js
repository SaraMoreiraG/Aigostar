// src/actions/cartActions.js

export const removeFromCart = (itemId) => {
  console.log("Removing item with ID:", itemId);
  return (dispatch, getState) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: itemId,
    });
    try {
      const updatedCart = getState().cart;
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error updating cart in localStorage:", error);
    }
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
    // Limpia el carrito actual
    dispatch(clearCart());

    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      const cartData = JSON.parse(storedCartData);

      // Agrega los elementos del almacenamiento local al carrito en Redux
      cartData.forEach((item) => {
        dispatch(addToCart(item));
      });
    }
  };
};

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const updateCartItem = (itemId, change) => {
  return (dispatch, getState) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { itemId, change },
    });

    // Get the updated cart from the Redux state
    const updatedCart = getState().cart;

    // Check if updatedCart is defined before saving to localStorage
    if (updatedCart !== undefined) {
      // Save the updated cart to localStorage
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
    }
  };
};
