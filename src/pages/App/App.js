import React, { Component } from "react";
// import { Link } from "react-router-dom";

import logo from "../../logo.svg";
import "./App.css";

import Text from "../../components/Text";
import Counter from "../../components/Counter";

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
  componentDidUpdate() {
    console.log("update");
  }
  componentDidMount() {
    console.log("did mount");
  }
  render() {
    console.log(this.state);
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
        </header>
      </div>
    );
  }
}

export default App;
