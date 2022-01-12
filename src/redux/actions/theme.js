// action creator merupakan sebuah fungsi yang me-return-kan action
// action merupakan sebuah object
import { ACTION_STRING } from "./actionString";

export const toggleTheme = () => {
  return {
    // type = berisikan jenis aksi
    // payload = data yang dibawa/mau dirubah/terbaru
    type: ACTION_STRING.toggleTheme,
  };
};
