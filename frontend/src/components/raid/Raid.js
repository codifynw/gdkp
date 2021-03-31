import React, { useState, useEffect } from "react";
import Boss from "../boss/Boss";

const Raid = () => {
  const [bosses, setBosses] = useState([]);
  let raidId = "6062b56dff6f03856f196fe8";

  useEffect(() => {
    requestBosses();
  }, []);

  let beNiceString = "<BE NICE>";

  async function requestBosses() {
    const res = await fetch("/bosses");
    const json = await res.json();
    setBosses(json);
  }

  console.log("BOSSES: ", bosses);

  return (
    <div>
      <div className="jumbo-wrap">
        <div className="jumbo-inner relative"></div>
        {/* <div className="vignete"></div> */}
        <div className="align-c">
          <div className="strong guild-name bigger">{beNiceString}</div>
          <div className="sub-guild bigger">NAXX GDKP</div>
        </div>
        <div className="raid-stats-wrap">
          <div className="raid-stat">
            <div className="raid-stat-key sub-guild">BOSSES</div>
            <div className="raid-stat-value guild-name">1/15</div>
          </div>
          <div className="raid-stat">
            <div className="raid-stat-key sub-guild">GOLD</div>
            <div className="raid-stat-value guild-name">3,000g</div>
          </div>
          <div className="raid-stat">
            <div className="raid-stat-key sub-guild">SPLIT</div>
            <div className="raid-stat-value guild-name">75</div>
          </div>
        </div>
      </div>
      <div id="bosses">
        {!bosses.length ? (
          <h2>Loading</h2>
        ) : (
          bosses.map((boss) => (
            <Boss
              name={boss.name}
              image={boss.image}
              raidId={raidId}
              bossId={boss._id}
              customName={boss.customName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Raid;
