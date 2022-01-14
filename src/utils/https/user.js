import axios from "axios";

const URL = process.env.REACT_APP_HOST + "/students";

export const getProfile = (id) => {
  return axios.get(URL.concat("/", id));
};
