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
      .then((json) => setBossLoot(json.map((item) => item.name)))
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
  }, []);

  const onSubmit = async (data) => {
    const { name, buyer, price } = data;

    var formData = new FormData();
    formData.append("name", name);
    formData.append("buyer", buyer);
    formData.append("price", price);

    const res = await fetch("http://localhost:4000/items/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });

    if (res.status === 200) {
      console.log("it was added");
    } else {
      console.log("error: ", res);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        {bossLoot.map((item) => (
          <option key={item} value={item} />
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
  );
};

export default AddItem;
