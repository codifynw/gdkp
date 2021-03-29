import React from "react";

const loot = [
  {
    name: "Item One",
    purchasePrice: 1200,
  },
  {
    name: "Item Two",
    purchasePrice: 150,
  },
];

// OLD WAY
// const Boss = ({ boss }) => {
//   return (
//     React.createElement("div"), {}, [React.createElement("h1", {}, boss.name)]
//   );
// };

// With JSX!
const Boss = ({ name, image }) => {
  return (
    <div className="boss-wrap">
      <div
        className="boss-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="loot-wrapper">
        <div className="boss-title">{name}</div>

        {!loot.length ? (
          <h2>Loading</h2>
        ) : (
          loot.map((lootItem) => (
            <div class="item-row">
              <div class="item-name">{lootItem.name}</div>
              <div class="item-price">
                {lootItem.purchasePrice.toLocaleString()}g
              </div>
            </div>
          ))
        )}
      </div>
      <div className="total-gold">12,000g</div>
    </div>
  );
};

export default Boss;
