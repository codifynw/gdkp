import React, { useState, useEffect } from "react";
import Boss from "../boss/Boss";
import "./raid.css";

const Raid = () => {
  const [bosses, setBosses] = useState([]);
  const [totalGold, setTotalGold] = useState(0);
  const [split, setSplit] = useState(0);
  let raidId = "6062b56dff6f03856f196fe8";

  useEffect(() => {
    requestBosses();
  }, []);

  useEffect(() => {
    requestTotalGold();
  }, [0]);

  let beNiceString = "<BE NICE>";

  async function requestBosses() {
    const res = await fetch("/bosses");
    const json = await res.json();
    setBosses(json);
  }

  async function requestTotalGold() {
    const res = await fetch(`/raids/${raidId}/gold`);
    const json = await res.json();
    setTotalGold(json[0].total);
    setSplit(json[0].total / 40);
  }

  return (
    <div>
      <div className="jumbo-wrap">
        <div className="corner-decorators">
          <div className="corner-decorator top-left"></div>
          <div className="corner-decorator top-right"></div>
        </div>
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
            <div className="raid-stat-value guild-name">{totalGold}g</div>
          </div>
          <div className="raid-stat">
            <div className="raid-stat-key sub-guild">SPLIT</div>
            <div className="raid-stat-value guild-name">{split}g</div>
          </div>
        </div>
      </div>
      <div className="boss-head-wrap">
        <div className="decorator bar-1"></div>
        <div className="section-title large">BOSSES</div>
        <div className="decorator bar-1 decorator-below"></div>
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
              key={boss._id}
              customName={boss.customName}
            />
          ))
        )}
      </div>
      <div className="leaderboard-title-wrap">
        <div className="decorator bar-1"></div>
        <div className="section-title large">LEADERBOARD</div>
        <div className="decorator bar-1 decorator-below"></div>
      </div>
    </div>
  );
};

export default Raid;
