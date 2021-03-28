import React, { Component } from "react";

class Boss extends Component {
  constructor() {
    super();
    // this.setState = {
    //   // boss: Response.data.name
    //   bosses: {
    //     name: "patch",
    //   },
    // };
  }
  render() {
    return (
      <div>
        <p>boss: {this.props.name}</p>
      </div>
    );
  }
}

export default Boss;
