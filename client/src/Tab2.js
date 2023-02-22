import React, { useEffect, useState, useCallback } from "react";
import Token from "./Token";

const Tab2 = (props) => {
  const [NFTArray, setNFTArray] = useState([]);
  let account = props.account;
  let instance = props.instance;

  const NFTlist = useCallback(async () => {
    try {
      const tempNFTArray = [];

      const balanceLength = await instance.methods.balanceOf(account).call();

      for (var i = 0; i < parseInt(balanceLength); i++) {
        const tokenId = await instance.methods
          .tokenOfOwnerByIndex(account, i)
          .call();

        const tokenPrice = await instance.methods.TokenPrice(tokenId).call();

        tempNFTArray.push({ id: tokenId, price: tokenPrice });
      }

      setNFTArray(tempNFTArray);
    } catch (error) {
      console.error(error);
    }
  }, [account, instance.methods]);

  useEffect(() => {
    if (!account) return;
    NFTlist();
  }, [account, NFTlist]);

  return (
    <div>
      {NFTArray &&
        NFTArray.map((i) => {
          return (
            <div key={i.id}>
              <Token
                id={i.id}
                price={i.price}
                account={account}
                instance={instance}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Tab2;
