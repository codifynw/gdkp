import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./landing.css";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="landing-container">
          <span className="gold">TIME IS MONEY, FRIEND</span>
          <span className="landing-title">GDKP PRO</span>
          &mdash; <span className="gold">LIVE BETA</span> &mdash;
        </div>
        <div className="landing-options">
          <div className="landing-option">
            <div className="option-prism">
              <div className="prism-side">START</div>
            </div>
          </div>
          <div className="landing-option">
            <div className="option-prism">
              <div className="prism-side">
                <Link to="/raid/123">JOIN</Link>
              </div>
            </div>
          </div>
          <div className="landing-option">
            <div className="option-prism">
              <div className="prism-side">BROWSE</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;

/* <div className="landing-option">
<div className="option-scene">
  <div className="cube">
    <div className="cube__face cube__face--front">JOIN</div>
    <div className="cube__face cube__face--back ">ENTER ID</div>
  </div>
</div>
</div> */
