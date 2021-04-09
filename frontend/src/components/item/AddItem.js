import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./item.css";

const AddItem = ({ raidId, bossId }) => {
  const [bossLoot, setBossLoot] = useState([]);
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: yup.object({
      item: yup.string(),
      buyer: yup.string(),
      price: yup.number().required().positive().integer(),
    }),
  });

  useEffect(() => {
    console.log("use effect: ", bossId);
    fetch(`/lootTables/boss/${bossId}`)
      .then((response) => response.json())
      .then((json) =>
        setBossLoot(
          json.map((item) => ({
            name: item.name,
            wowId: item.wowId,
            id: item.id,
            key: item.id,
          }))
        )
      )
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
  }, []);

  const onSubmit = async (data) => {
    console.log("bossLoot: ", bossLoot);
    console.log("data: ", data);
    const { name, buyer, price } = data;

    // var formData = new FormData();
    // formData.append("name", name);
    // formData.append("buyer", buyer);
    // formData.append("price", price);

    // const res = await fetch("/loot/", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: name,
    //     buyer: buyer,
    //     price: price,
    //     raidId: raidId,
    //     bossId: bossId,
    //   }),
    // });
  };

  return (
    <div key={bossId}>
      <form key={bossId} onSubmit={handleSubmit(onSubmit)}>
        {/* <input type="text" placeholder="item" name="name" {...register("name")} /> */}
        <input
          type="text"
          name="name"
          label="Item"
          autoComplete="off"
          list={bossId}
          {...register("name")}
        />
        <datalist id={bossId}>
          {bossLoot.map((item, key) => (
            <option key={key} value={item.name} data-value={item.wowId} />
          ))}
        </datalist>
        <input
          type="text"
          placeholder="buyer"
          name="buyer"
          {...register("buyer")}
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          {...register("price")}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddItem;
