import React, { useState } from "react";
import ReactDOM from "react-dom";
import Raid from "./components/raid/Raid";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "normalize.css";
import "./css/main.css";

const User = () => {
  return <div>This is the user page</div>;
};

const App = () => {
  return (
    <div id="main">
      <BrowserRouter>
        <nav>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/user/:id">User</Link>
          </div>
        </nav>
        <Switch>
          <Route path="/user/:id">
            <User />
          </Route>
          <Route path="/" exact>
            <Raid />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
