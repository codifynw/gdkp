import React, { useState, useEffect } from "react";
import Boss from "../boss/Boss";

const Raid = () => {
  const [bosses, setBosses] = useState(["oneBoss", "twoBoss"]);

  useEffect(() => {
    requestBosses();
  }, []);

  async function requestBosses() {
    const res = await fetch("/bosses");
    const json = await res.json();
    setBosses(json);
  }

  console.log("bosses: ", bosses);

  return (
    <div>
      <h1>NAXX GDKP</h1>
      <Boss name="Loatheb" />
    </div>
  );
};

export default Raid;
