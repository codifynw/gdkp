import React, { useState } from "react";
import ReactDOM from "react-dom";
import Raid from "./components/raid/Raid";
import Landing from "./components/landing/Landing";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "normalize.css";
import "./css/main.css";

const App = () => {
  return (
    <div id="main">
      <BrowserRouter>
        <Switch>
          <Route path="/raid/:id" component={Raid} />
          <Route path="/" exact>
            <Landing />
            <nav>
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>
                <Link to="/raid/:id">Raid</Link>
              </div>
            </nav>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
