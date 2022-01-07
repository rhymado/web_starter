import React from "react";

const token = JSON.parse(localStorage.getItem("web-starter-token"));
const defaultValue = {
  token,
};
export const authContext = React.createContext(defaultValue);
