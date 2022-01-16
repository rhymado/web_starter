import axios from "axios";

const URL = process.env.REACT_APP_HOST + "/classes?name=i&category_id=3";

export const getClasses = (token) => {
  return axios.get(URL, {
    headers: {
      "x-access-token": token,
    },
  });
};
