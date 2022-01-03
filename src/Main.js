import React from "react";
import {
  BrowserRouter as Router,
  // Redirect,
  Route,
  Switch,
} from "react-router-dom";
// react-router-dom v5.2.0

import Landing from "./pages/Landing";
import App from "./pages/App";
import Pokemon from "./pages/Pokemon";
import NotFound from "./pages/NotFound";
import Detail from "./pages/PokemonDetail";

function Main() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route></Route>
    //     <Route></Route>
    //     <Route></Route>
    //     <Route></Route>
    //   </Routes>
    // </BrowserRouter>
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
        <Route path="/pokemon/:id" component={Detail} />
        <Route path="/pokemon" component={Pokemon} />
        <Route path="*" component={NotFound} />
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </Router>
  );
}

export default Main;
