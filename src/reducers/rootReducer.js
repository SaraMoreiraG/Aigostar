import initialState from "./initialState";

const rootReducer = (state = initialState, action) => {
  let updatedCart;

  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
      case "REMOVE_FROM_CART":
        updatedCart = state.cart.filter((item) => item.id !== action.payload);
        return {
          ...state,
          cart: updatedCart,
        };
    case "LOAD_CART_FROM_LOCAL_STORAGE":
      return {
        ...state,
        cart: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "UPDATE_ITEM":
      const { itemId, change } = action.payload;
      // Find the item in the cart and update its quantity
      updatedCart = state.cart.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + change };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedCart,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "LOAD_USER_FROM_LOCAL_STORAGE":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_AIRFRYERS":
      return {
        ...state,
        airfryers: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
