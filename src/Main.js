import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// react-router-dom v5.2.0

import Landing from "./pages/Landing";
import App from "./pages/App";
import Pokemon from "./pages/Pokemon";
import NotFound from "./pages/NotFound";
import Detail from "./pages/PokemonDetail";
import Sales from "./pages/Sales";
import Cashier from "./pages/Cashier";

import { authContext } from "./contexts/auth";
import { themeContext } from "./contexts/theme";

class Main extends React.Component {
  state = {
    token: "",
    theme: "dark",
  };
  toggleTheme = () => {
    // this.setState((prevState) => {
    //   if (prevState.theme === "dark") return { theme: "light" };
    //   return { theme: "dark" };
    // });
    if (this.state.theme === "dark") return this.setState({ theme: "light" });
    this.setState({ theme: "dark" });
  };
  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("web-starter-token"));
    if (!token) {
      return;
    }
    this.setState({
      token,
    });
  }
  render() {
    const accessToken = JSON.parse(localStorage.getItem("web-starter-token"));
    return (
      // <BrowserRouter>
      //   <Routes>
      //     <Route></Route>
      //     <Route></Route>
      //     <Route></Route>
      //     <Route></Route>
      //   </Routes>
      // </BrowserRouter>
      <authContext.Provider value={{ token: this.state.token }}>
        <themeContext.Provider
          value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
        >
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={(routerProps) => {
                  // routerProps => props yang diberikan oleh router
                  // match, history, location
                  return <Landing username="Arik" {...routerProps} />;
                }}
              />
              {/* jika pakai atribut render, yang dipassing apa yang 
              diberikan ke komponen tsb (manual passing) */}
              <Route path="/app" component={App} />
              {/* jika pakai atribut component, yang dipassing hanya 
              props router saja (automatic passing) */}
              <Route
                path="/pokemon/:id"
                render={(routerProps) => {
                  const { match } = routerProps;
                  if (!accessToken)
                    return (
                      <Redirect from={`/pokemon/${match.params.id}`} to="/" />
                    );
                  return <Detail {...routerProps} />;
                }}
              />
              <Route
                path="/pokemon"
                render={(routerProps) => {
                  if (!accessToken) return <Redirect from="/pokemon" to="/" />;
                  return <Pokemon {...routerProps} />;
                }}
              />
              <Route path="/sales" component={Sales} />
              <Route path="/cashier" component={Cashier} />
              <Route path="*" component={NotFound} />
              {/* <Redirect from="*" to="/" /> */}
            </Switch>
          </Router>
        </themeContext.Provider>
      </authContext.Provider>
    );
  }
}

export default Main;
