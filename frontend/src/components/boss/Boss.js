import React, { useState, useEffect } from "react";
import Item from "../item/Item";

const Boss = ({ name, image, raidId, bossId }) => {
  let overlayText = "";
  let hasLoot = false;
  const [loot, setLoot] = useState([]);

  useEffect(() => {
    requestLoot();
  }, []);

  async function requestLoot() {
    const res = await fetch(`/raids/${raidId}/loot/${bossId}`);
    const json = await res.json();
    setLoot(json);
  }

  if (loot.length) {
    hasLoot = true;
    overlayText =
      loot
        .map((item) => item.price)
        .reduce((prev, next) => prev + next)
        .toLocaleString() + "g";
  }

  console.log("LOOT: ", loot);
  console.log("bossId: ", bossId);

  // With JSX!
  return (
    <div key={bossId} className="boss-wrap">
      <div
        className={`boss-image ${hasLoot ? "" : "alive"}`}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="loot-wrapper">
        <h2 className="boss-title">{name}</h2>
        {!hasLoot ? (
          <div></div>
        ) : (
          loot.map((lootItem) => (
            <Item
              buyer={lootItem.buyer}
              price={lootItem.price}
              itemKey={lootItem._id}
            />
          ))
        )}
      </div>
      {hasLoot ? (
        <div className="overlay-text total-gold">{overlayText}</div>
      ) : (
        <div className="overlay-text tbd-overlay">{overlayText}</div>
      )}
    </div>
  );
};

export default Boss;
