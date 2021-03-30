import React, { useState } from "react";
import ReactDOM from "react-dom";
import Raid from "./components/raid/Raid";
import "./css/main.css";

async function requestBosses() {
  const res = await fetch("/bosses");
  const json = await res.json();
  setBosses(json);
}

const App = () => {
  return (
    <div id="main">
      <Raid />
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
