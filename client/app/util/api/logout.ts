export const logout = () => {
  localStorage.setItem("JWT_TOKEN", "");
};
