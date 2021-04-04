import React, { Component } from "react";
import "./landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="landing-container">
        <span className="gold">SPICE UP YOUR RAID</span>
        <span className="landing-title">GDKP PRO</span>
        &mdash; <span className="gold">GET ALL THE STATS</span> &mdash;
      </div>
    );
  }
}

export default Landing;
