// Authentication utility functions

export const login = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("isLoggedIn", "true");
  
  // Trigger custom event to update login state immediately
  window.dispatchEvent(new Event('loginStateChange'));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  
  // Trigger custom event to update login state immediately
  window.dispatchEvent(new Event('loginStateChange'));
};

export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true" && localStorage.getItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
