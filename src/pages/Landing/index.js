import React from "react";
import "./Landing.css";
// import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

function Landing(props) {
  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      name: e.target.username.value,
      password: e.target.password.value,
    };
    const URL = "http://localhost:8000/auth";
    axios
      .post(URL, body)
      .then((response) => {
        const token = response.data.result.token;
        localStorage.setItem("web-starter-token", JSON.stringify(token));
        props.history.push("/app");
      })
      .catch((err) => console.error(err));
  };
  return (
    <main className="container">
      <h1>Landing Page</h1>
      <h2>Selamat Datang, {props.username}</h2>
      <nav className="navlink">
        <ul>
          <li>
            {/* <Link to="/app">
              <p>/app</p>
            </Link> */}
            <div
              className="button App-link"
              onClick={() => {
                // put logic here
                console.log(props.history);
                props.history.push("/app");
              }}
              style={{
                width: "50vw",
                height: "10vh",
              }}
            >
              <p>/app</p>
            </div>
          </li>
        </ul>
      </nav>
      <section className="auth">
        <form className="login" onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <Button type="submit" className="mt-1" variant="secondary">
            Login
          </Button>
        </form>
      </section>
      <section className="mt-2 p-2 bg-dark" style={{ height: "10vh" }}>
        <div className="row h-100 w-100 p-2">
          <div className="col-md-6 bg-primary"></div>
          <div className="col-md-6 bg-secondary"></div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
