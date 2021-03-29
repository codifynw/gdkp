import React from "react";

// OLD WAY
// const Boss = ({ boss }) => {
//   return (
//     React.createElement("div"), {}, [React.createElement("h1", {}, boss.name)]
//   );
// };

// With my friend JSX!
const Boss = ({ name, image }) => {
  return (
    <div className="boss-wrap">
      <div
        className="boss-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="loot-wrapper">
        <div className="boss-title">{name}</div>
      </div>
      <div className="total-gold"></div>
    </div>
  );
};

export default Boss;
