import React, { useState } from "react";
import ReactDOM from "react-dom";
import Raid from "./components/raid/Raid";
import "normalize.css";
import "./css/main.css";

const App = () => {
  return (
    <div id="main">
      <Raid />
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
