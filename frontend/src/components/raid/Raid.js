import React, { Component } from "react";
import axios from "axios";
import Boss from "../boss/Boss";

class Raid extends Component {
  constructor() {
    super();
    this.state = {
      bosses: {},
    };
  }

  componentDidMount = () => {
    axios.get("/bosses").then((response) => {
      this.setState({
        bosses: response.data,
      });
    });
  };

  render() {
    console.log("***");
    console.log(this.state.bosses[0]);
    let firstBoss = this.state.bosses[0];
    return (
      <div>
        <h1>NAXX GDKP</h1>
        <Boss {...firstBoss} />
      </div>
    );
  }
}

export default Raid;
