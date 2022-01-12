import React from "react";
import { connect } from "react-redux";
import "./Landing.css";
// import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { login } from "../../utils/https/auth";
import { loginAction } from "../../redux/actions/auth";

// import gitLogo from "../../assets/img/git.png";

class Landing extends React.Component {
  submitHandler = (e) => {
    e.preventDefault();
    const body = {
      name: e.target.username.value,
      password: e.target.password.value,
    };
    // const URL = process.env.REACT_APP_HOST + "/auth";
    // axios
    //   .post(URL, body)
    // login(body)
    //   .then((response) => {
    //     const token = response.data.result.token;
    //     localStorage.setItem("web-starter-token", JSON.stringify(token));
    //     props.history.push("/app");
    //   })
    //   .catch((err) => console.error(err));
    // this.props.dispatch(loginAction(body));
    this.props.loginDispatch(body);
  };
  componentDidUpdate() {
    // console.log(this.props.auth.isFulfilled, prevProps.auth.isFulfilled);
    if (this.props.auth.isFulfilled === true) {
      localStorage["web-starter-token"] = JSON.stringify(
        this.props.auth.userData.token
      );
      // console.log(this.props.auth.userData.token);
      this.props.history.push("/app");
    }
  }
  render() {
    // if (this.props.auth.isFulfilled) console.log(this.props.auth.isFulfilled);
    return (
      <main className="container">
        <h1>Landing Page</h1>
        <h2>Selamat Datang, {this.props.username}</h2>
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
                  // console.log(this.props.history);
                  this.props.history.push("/app");
                }}
                style={{
                  width: "50vw",
                  height: "10vh",
                }}
              >
                <p>/app</p>
                {/* <img src={gitLogo} alt="logo-git" /> */}
              </div>
            </li>
          </ul>
        </nav>
        <section className="auth">
          <form className="login" onSubmit={this.submitHandler}>
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
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginDispatch: (body) => {
      dispatch(loginAction(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
