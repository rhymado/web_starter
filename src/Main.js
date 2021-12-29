import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// react-router-dom v5.2.0

import Landing from "./pages/Landing/Landing";
import App from "./pages/App/App";

function Main() {
  return (
    <Router>
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
    </Router>
  );
}

export default Main;
