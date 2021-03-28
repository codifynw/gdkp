import React, { Component } from "react";
import axios from "axios";

class Raid extends Component {
  constructor() {
    super();
    this.state = {
      boss: "who knows",
    };
  }

  componentDidMount = () => {
    axios.get("/bosses").then((response) => {
      console.log("response: ", response);
    });
  };

  render() {
    return (
      <div>
        <h1>NAXX GDDKKP</h1>
      </div>
    );
  }
}

export default Raid;
