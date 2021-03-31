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
        <div className="align-c">
          <div className="strong guild-name">{beNiceString}</div>
          <div className="sub-guild">NAXX GDKP</div>
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
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Raid;
