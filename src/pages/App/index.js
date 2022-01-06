import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import logo from "../../logo.svg";
import "./App.css";

import Text from "../../components/Text";
import Counter from "../../components/Counter";
import axios from "axios";

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
  componentDidUpdate() {
    console.log("update");
  }
  componentDidMount() {
    console.log("did mount");
    const token = JSON.parse(localStorage.getItem("web-starter-token"));
    // if (!token) {
    //   return this.props.history.replace("/");
    // }
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
  render() {
    const token = JSON.parse(localStorage.getItem("web-starter-token"));
    if (!token) return <Redirect to="/" />;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">Welcome</h1>
          {/* <Link to="/">
              <p>go to landing page</p>
            </Link> */}
          <button
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            <p>go to landing page</p>
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

export default App;