import React, { useState, useEffect } from "react";
import Boss from "../boss/Boss";

const Raid = () => {
  const [bosses, setBosses] = useState([]);

  useEffect(() => {
    requestBosses();
  }, []);

  async function requestBosses() {
    const res = await fetch("/bosses");
    const json = await res.json();
    setBosses(json);
  }

  return (
    <div>
      <h1>NAXX GDKP</h1>
      <div id="bosses">
        {!bosses.length ? (
          <h2>Loading</h2>
        ) : (
          bosses.map((boss) => (
            <Boss
              name={boss.name}
              key={boss.name}
              image={boss.image}
              loot={boss.name}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Raid;
