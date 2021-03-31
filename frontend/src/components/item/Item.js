import React from "react";

const Item = ({ buyer, price, itemKey, wowId, customName }) => {
  // WILL HAVE TO WAIT DUE TO CORS ISSUES
  //   async function getNameFromId() {
  //     const res = await fetch(`https://classic.wowhead.com/item=${wowId}&xml`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         mode: "cors", // no-cors, *cors, same-origin
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     });
  //     const json = await res.json();
  //     console.log("json: ", json);
  //   }
  //   let itemName = getNameFromId(wowId);

  return (
    <div key={itemKey} className="item-row">
      <a href={"http://www.classic.wowhead.com/item=" + wowId}>
        <div className="item-name">{customName}</div>
        <div className="item-buyer">{buyer}</div>
      </a>
      <div className="item-price">{price?.toLocaleString()}g</div>
    </div>
  );
};

export default Item;
