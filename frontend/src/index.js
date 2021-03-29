import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Raid from "./components/raid/Raid";
import reportWebVitals from "./reportWebVitals";

const App = () => {
  return (
    <div>
      <Raid />
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
