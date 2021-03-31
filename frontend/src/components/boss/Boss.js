import React, { useState, useEffect } from "react";

const Boss = ({ name, key, image, raidId, bossId }) => {
  const [loot, setLoot] = useState([]);

  console.log("bossId: ", bossId);

  useEffect(() => {
    requestLoot();
  }, []);

  async function requestLoot() {
    const res = await fetch(`/raids/${raidId}/loot/${bossId}`);
    const json = await res.json();
    setLoot(json);
  }

  console.log("loot: ", loot);

  // With JSX!
  return (
    <div className="boss-wrap">
      <div
        className="boss-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="loot-wrapper">
        <h2 className="boss-title">{name}</h2>
        {!loot.length ? (
          <div>No Loot</div>
        ) : (
          loot.map((lootItem) => (
            <div key={lootItem.wowId} className="item-row">
              <a href={"http://www.classic.wowhead.com/item=" + lootItem.wowId}>
                {/* <div className="item-name">{lootItem.name}</div> */}
                <div className="item-name">Placeholder</div>
              </a>
              <div className="item-price">
                {lootItem.price?.toLocaleString()}g
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
