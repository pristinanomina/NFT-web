import React from "react";
import img from "./1.png";
import web3 from "web3";

const TokenSell = (props) => {
  const Buy = async () => {
    try {
      const response = await props.instance.methods
        .tokenBuy(props.id)
        .send({ from: props.account, value: props.price });

      window.location.replace("/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <img src={img} alt="" />
      Token ID : {props.id}, Token Price : {web3.utils.fromWei(props.price)}{" "}
      ETH, <button onClick={Buy}>Buy</button>
    </div>
  );
};

export default TokenSell;
