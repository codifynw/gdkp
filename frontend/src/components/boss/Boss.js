import React, { useState, useEffect } from "react";
import Item from "../item/Item";
import EditItem from "../item/EditItem";
import AddItem from "../item/AddItem";
import "./boss.css";

const Boss = ({ name, image, raidId, bossId }) => {
  const [loot, setLoot] = useState([]);
  let hasLoot = false;
  const loggedIn = false;
  let overlayText = "";

  useEffect(() => {
    fetch(`/raids/${raidId}/loot/${bossId}`)
      .then((response) => response.json())
      .then((json) => setLoot(json));
  }, []);

  if (loot.length) {
    hasLoot = true;
    overlayText =
      loot
        .map((item) => item.price)
        .reduce((prev, next) => prev + next)
        .toLocaleString() + "g";
  }

  function addItem() {
    console.log("do it");
  }

  // With JSX!
  return (
    <div className="flip-card boss-wrap">
      <div key={bossId} className="flip-card-inner">
        <div className="flip-card-front">
          <div
            className={`boss-image ${hasLoot ? "" : "alive"}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="boss-title">{name}</div>
          {hasLoot ? (
            <div className="overlay-text total-gold">{overlayText}</div>
          ) : (
            <div className="overlay-text tbd-overlay">{overlayText}</div>
          )}
        </div>
        <div className="flip-card-back">
          {loggedIn ? (
            <div className="loot-wrapper">
              {loot?.map((lootItem) => (
                <EditItem
                  buyer={lootItem.buyer}
                  price={lootItem.price}
                  key={lootItem._id}
                  wowId={lootItem.wowId}
                  customName={lootItem.customName}
                  name={lootItem.blizzData?.name}
                />
              ))}
              <AddItem raidId={raidId} bossId={bossId} key={bossId} />
              {/* <button onClick={addItem}>Add Item</button>; */}
            </div>
          ) : (
            <div className="loot-wrapper">
              {loot?.map((lootItem) => (
                <Item
                  buyer={lootItem.buyer}
                  price={lootItem.price}
                  key={lootItem._id}
                  wowId={lootItem.wowId}
                  customName={lootItem.customName}
                  name={lootItem.blizzData?.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Boss;
