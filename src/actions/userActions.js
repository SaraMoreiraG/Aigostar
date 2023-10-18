export const login = (userData) => ({
  type: "LOGIN",
  payload: userData,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const loadUserFromLocalStorage = () => {
  return (dispatch) => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      dispatch(login(userData));
    }
  };
};
