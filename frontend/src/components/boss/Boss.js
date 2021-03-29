import React from "react";

// OLD WAY
// const Boss = ({ boss }) => {
//   return (
//     React.createElement("div"), {}, [React.createElement("h1", {}, boss.name)]
//   );
// };

// With my friend JSX!
const Boss = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};

export default Boss;
