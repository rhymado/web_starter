import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./index.css";

import { getProfile } from "../../utils/https/user";
import gitLogo from "../../assets/img/git.png";
import { themeContext } from "../../contexts/theme";
import { toggleTheme as toggleFromRedux } from "../../redux/actions/theme";

function Hooks() {
  // useState mereturnkan 2 buah variabel
  // 1. variabel state nya
  // 2. fungsi untuk mengubah variabel 1 (state)
  const [counter, setCounter] = React.useState(1);
  const [theme, setTheme] = React.useState("dark");
  const [profile, setProfile] = React.useState(() => {
    const photo = localStorage["web-starter-photo"];
    if (photo) {
      return JSON.parse(photo);
    }
    return gitLogo;
  });
  const { theme: themeValue, toggleTheme: toggleFromContext } =
    React.useContext(themeContext);
  const themeFromRedux = useSelector((state) => state.theme);
  console.log(themeFromRedux);
  const dispatch = useDispatch();

  // kita bisa menentukan nilai awal/default dari state
  // 2 caranya => fungsi atau variabel langsung
  const addCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
  };
  const subCounter = () => {
    const newCounter = counter - 1 < 0 ? 0 : counter - 1;
    setCounter(newCounter);
  };
  const toggleTheme = () => {
    setTheme(() => {
      let newTheme = "dark";
      if (theme === "dark") newTheme = "light";
      return newTheme;
    });
    toggleFromContext();
    dispatch(toggleFromRedux());
  };

  // did mount
  useEffect(() => {
    console.log("did mount");
    getProfile(1)
      .then((res) => {
        const { result } = res.data;
        // console.log(result[0].profile);
        setProfile(result[0].profile);
      })
      .catch((err) => console.error(err));

    // will unmount
    return () => {};
  }, []);
  // did update khusus
  useEffect(() => {
    console.log("counter berubah", counter);

    // will unmount
    return () => {};
  }, [counter]);
  // did update umum
  //   useEffect(() => {
  //     console.log("ada state yang berubah");
  //   });
  useEffect(() => {
    console.log(themeValue);
  }, [themeValue]);

  return (
    <div className={`container-fluid ${theme} vh-100`}>
      <h1 className="title">Counter</h1>
      <main className="content">
        <div className="btn minus" onClick={subCounter}>
          -
        </div>
        <div className="number">{counter}</div>
        <div className="btn plus" onClick={addCounter}>
          +
        </div>
      </main>
      <footer className="footer mt-2 d-flex justify-content-around">
        <div className="photo-container">
          <img src={profile} alt="profile" className="photo-profile" />
        </div>
        <div
          className="btn theme-toggler d-flex justify-content-center align-items-center"
          onClick={toggleTheme}
        >
          <p className="m-0">Change Theme</p>
        </div>
      </footer>
    </div>
  );
}

export default Hooks;
