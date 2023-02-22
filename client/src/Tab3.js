import React, { useEffect, useState, useCallback } from "react";
import TokenSell from "./TokenSell";

const Tab3 = (props) => {
  const [SaleArray, setSaleArray] = useState([]);
  let account = props.account;
  let instance = props.instance;

  const OnSale = useCallback(async () => {
    try {
      const tempArray = [];
      const OnSaleArrayLength = await instance.methods
        .onSaleArrayLength()
        .call();

      for (var i = 0; i < parseInt(OnSaleArrayLength); i++) {
        const tokenId = await instance.methods.onSaleArray(i).call();
        const tokenPrice = await instance.methods.TokenPrice(tokenId).call();

        tempArray.push({ id: tokenId, price: tokenPrice });
      }

      setSaleArray(tempArray);
    } catch (error) {
      console.log(error);
    }
  }, [instance.methods]);

  useEffect(() => {
    if (!account) return;
    OnSale();
  }, [account, OnSale]);

  return (
    <div>
      <div>
        {SaleArray &&
          SaleArray.map((i) => {
            return (
              <div key={i.id}>
                <TokenSell
                  id={i.id}
                  price={i.price}
                  account={account}
                  instance={instance}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Tab3;
