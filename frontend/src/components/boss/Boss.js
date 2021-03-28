import React, { Component } from "react";

// OLD WAY
// const Boss = ({ boss }) => {
//   return (
//     React.createElement("div"), {}, [React.createElement("h1", {}, boss.name)]
//   );
// };

// With my friend JSX!
const Boss = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
    </div>
  );
};

export default Boss;
