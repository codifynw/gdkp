import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./item.css";

const AddItem = ({ raidId, bossId }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: yup.object({
      item: yup.string(),
      buyer: yup.string(),
      price: yup.number().required().positive().integer(),
    }),
  });

  const onSubmit = (data) => {
    data.bossId = bossId;
    data.raidId = raidId;
    console.log("data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="item" name="name" {...register("name")} />
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
