import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import logo from "../../logo.svg";
import "./App.css";

import Text from "../../components/Text";
import Counter from "../../components/Counter";
import { themeContext } from "../../contexts/theme";
import { toggleTheme as toggleThemeAction } from "../../redux/actions/theme";

class App extends Component {
  state = {
    counter: 0,
    content: "Selamat Datang di Materi React",
    series: [
      {
        title: "Naruto",
        schedule: "Wed 17:00 - 18:00",
      },
    ],
    userToken: "",
  };
  onClickPrevious = () => {
    const number = this.state.counter;
    this.setState({
      counter: number - 1,
    });
    /**
     * state = {
     *  ...state,
     * counter: number - 1
     * }
     */
  };
  onClickNextCounter = () => {
    const number = this.state.counter;
    this.setState({
      counter: number + 1,
    });
  };
  onLogout = () => {
    // axios delete untuk logout
    // jika berhasil
    localStorage.removeItem("web-starter-token");
    this.setState({
      userToken: "",
    });
    // jika gagal
  };
  // componentDidUpdate() {
  //   console.log("update");
  // }
  componentDidMount() {
    console.log("did mount");
    const token = JSON.parse(localStorage.getItem("web-starter-token"));
    if (!token) {
      return;
    }
    const URL = "http://localhost:8000/classes?name=i&category_id=3";
    axios
      .get(URL, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => console.log(response.data))
      .catch((err) => {
        // jika error 403 dan role tidak cocok
        // kamu hapus token
        console.error(err);
      });
    this.setState({
      userToken: token,
    });
  }
  toggleThemeRedux = () => {
    // secara natural dispatch bisa diambil dari props jika sudah
    // disambungkan dengan redux
    this.props.dispatch(toggleThemeAction());
  };
  render() {
    const token = JSON.parse(localStorage.getItem("web-starter-token"));
    if (!token) return <Redirect to="/" />;
    const { theme, toggleTheme } = this.context;
    // console.log("[PROPS REDUX STORE]", this.props.theme);
    return (
      <div className="App">
        <header className={`App-header ${theme === "dark" ? "dark" : "light"}`}>
          <h1 className="title">Welcome</h1>
          {/* <Link to="/">
              <p>go to landing page</p>
            </Link> */}
          <button
            onClick={() => {
              this.props.history.push("/pokemon");
            }}
          >
            <p>go to pokemon</p>
          </button>
          <button
            onClick={() => {
              toggleTheme();
              // this.toggleThemeRedux();
              this.props.toggleThemeRedux();
            }}
          >
            Toggle Theme
          </button>
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          <Text
            content={this.state.content}
            isShown={true}
            data={this.state.series}
          />
          <Counter
            onClickPrev={this.onClickPrevious}
            onClickNext={this.onClickNextCounter}
            counterNumber={this.state.counter}
          />
          <div className="button-wrapper">
            {/* <button onClick={this.onClickPrevious}>prev</button>
            <button onClick={this.onClickNextCounter}>next</button> */}
            <button
              onClick={() => {
                this.forceUpdate();
              }}
            >
              refresh page
            </button>
          </div>
          <form
            className="content-change"
            onSubmit={(event) => {
              event.preventDefault();
              const newContent = event.target.konten.value;
              this.setState({
                content: newContent,
              });
            }}
          >
            <input type="text" name="konten" />
            <button type="submit">Ubah</button>
          </form>
          <section>
            <div className="button" onClick={this.onLogout}>
              Logout
            </div>
          </section>
        </header>
      </div>
    );
  }
}
App.contextType = themeContext;

// HOC = Higher Order Component
// Komposisi komponen
const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleThemeRedux: () => {
      dispatch(toggleThemeAction());
    },
  };
};
const AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(App);
// () 1
// parameter = mapStateToProps, mapDispatchToProps
// () 2
// parameter = komponen yang mau disambungkan ke redux
// export default App;
export default AppWithRedux;
