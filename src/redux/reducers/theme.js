import { ACTION_STRING } from "../actions/actionString";
const initialState = {
  theme: "dark",
};
const themeReducer = (prevState = initialState, action) => {
  // buat handler untuk masing masing action type
  // action : {type, payload}
  switch (action.type) {
    case ACTION_STRING.toggleTheme:
      let newTheme = "dark";
      if (prevState.theme === "dark") newTheme = "light";
      //   if (prevState.theme === "light") newTheme = "dark";
      return {
        ...prevState,
        theme: newTheme,
      };

    default:
      return prevState;
  }
};

export default themeReducer;
