import React from "react";

const loot = [
  {
    name: "Item One",
    purchasePrice: 1200,
    wowId: 23000,
  },
  {
    name: "Item Two",
    purchasePrice: 150,
    wowId: 1131,
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
            <div key={lootItem.wowId} className="item-row">
              <a href={"http://www.classic.wowhead.com/item=" + lootItem.wowId}>
                <div className="item-name">{lootItem.name}</div>
              </a>
              <div className="item-price">
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
