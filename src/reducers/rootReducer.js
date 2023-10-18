import initialState from "./initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "LOAD_CART_FROM_LOCAL_STORAGE":
      return {
        ...state,
        cart: action.payload,
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
