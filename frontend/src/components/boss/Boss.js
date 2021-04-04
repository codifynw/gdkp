import React, { useState, useEffect } from "react";
import Item from "../item/Item";
import EditItem from "../item/EditItem";
import "./boss.css";

const Boss = ({ name, image, raidId, bossId }) => {
  let overlayText = "";
  let hasLoot = false;
  const [loot, setLoot] = useState([]);
  const loggedIn = true;

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

  function TotalLoot(props) {
    return props.hasLoot ? (
      <div className="overlay-text total-gold">{props.overlayText}</div>
    ) : (
      <div className="overlay-text tbd-overlay">{props.overlayText}</div>
    );
  }

  function onClickFunction() {
    console.log("do it");
  }

  // With JSX!
  return (
    <div key={bossId} className="boss-wrap">
      <div
        className={`boss-image ${hasLoot ? "" : "alive"}`}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="boss-title">{name}</div>
      <div class="grad-filter-up"></div>

      {loggedIn ? (
        <div className="loot-wrapper">
          {loot?.map((lootItem) => (
            <EditItem
              buyer={lootItem.buyer}
              price={lootItem.price}
              itemKey={lootItem._id}
              customName={lootItem.customName}
              wowId={lootItem.wowId}
            />
          ))}
          <button onClick={onClickFunction}>Add Item</button>;
        </div>
      ) : (
        <div className="loot-wrapper">
          {loot?.map((lootItem) => (
            <Item
              buyer={lootItem.buyer}
              price={lootItem.price}
              itemKey={lootItem._id}
              customName={lootItem.customName}
              wowId={lootItem.wowId}
            />
          ))}
        </div>
      )}

      <TotalLoot hasLoot={hasLoot} overlayText={overlayText} />
    </div>
  );
};

export default Boss;
