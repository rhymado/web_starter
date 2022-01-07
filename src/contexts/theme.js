import React from "react";

export const themeContext = React.createContext({
  theme: "dark",
  toggleTheme: () => {},
});
