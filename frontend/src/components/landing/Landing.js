import React, { Component } from "react";
import "./landing.css";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="landing-container">
          <span className="gold">SPICE UP YOUR RAID</span>
          <span className="landing-title">GDKP PRO</span>
          &mdash; <span className="gold">GET ALL THE STATS</span> &mdash;
        </div>
        <div className="landing-options">
          <div className="landing-option">START</div>
          <div className="landing-option">JOIN</div>
          <div className="landing-option">BROWSE</div>
        </div>
      </div>
    );
  }
}

export default Landing;
