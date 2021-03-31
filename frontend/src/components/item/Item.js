import React from "react";

const Item = ({ buyer, price, itemKey }) => {
  return (
    <div key={itemKey} className="item-row">
      <a href={"http://www.classic.wowhead.com/item=" + "23000"}>
        <div className="item-name">itemname</div>
        <div className="item-buyer">{buyer}</div>
      </a>
      <div className="item-price">{price?.toLocaleString()}g</div>
    </div>
  );
};

export default Item;
