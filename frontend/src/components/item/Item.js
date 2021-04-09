import React from "react";
import "./item.css";

const Item = ({ buyer, price, itemKey, wowId, customName, name }) => {
  return (
    <div key={itemKey} className="item-row">
      <a href={"http://www.classic.wowhead.com/item=" + wowId}>
        <div className="item-name">{name}</div>
        <div className="item-buyer">{buyer}</div>
      </a>
      <div className="item-price">{price?.toLocaleString()}g</div>
    </div>
  );
};

export default Item;
