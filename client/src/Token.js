import React, { useState } from "react";
import img from "./1.png";
import web3 from "web3";

const Token = (props) => {
  const [price, setPrice] = useState("");
  const [tokenPrice, setTokenPrice] = useState(props.price);

  const Sell = async () => {
    try {
      if (!props.account) return;

      const response = await props.instance.methods
        .tokenSale(parseInt(props.id), web3.utils.toWei(price, "ether"))
        .send({ from: props.account });

      setTokenPrice(web3.utils.toWei(price, "ether"));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const priceSet = async ({ target: { value } }) => {
    setPrice(value);
  };

  return (
    <div>
      <img src={img} alt="" />
      Token ID : {props.id}
      {tokenPrice === "0" ? (
        <div>
          <input name="price" value={price} onChange={priceSet}></input>
          <button onClick={Sell}>Sell</button>
        </div>
      ) : (
        <div>
          <span style={{ color: "red" }}>On Sale </span>:{" "}
          {web3.utils.fromWei(tokenPrice, "ether")} ETH
        </div>
      )}
    </div>
  );
};

export default Token;
