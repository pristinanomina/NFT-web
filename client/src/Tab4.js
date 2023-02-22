import React, { useEffect, useState, useCallback } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

const Tab4 = (props) => {
  const [eventArray, setEventArray] = useState([]);

  const events = useCallback(async () => {
    const event2 = await props.instance.getPastEvents("tradeLog", {
      fromBlock: 0,
      toBlock: "latest",
    });

    let events =
      event2 &&
      event2.map((v) => {
        return v.returnValues;
      });

    setEventArray(events);
  }, [props.instance]);

  useEffect(() => {
    events();
  }, [props.account, eventArray, events]);

  return (
    <div>
      <div>NFT 거래 기록.</div>
      <div>
        <Table striped bordered style={{ width: "99%" }}>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>Token Id</th>
              <th style={{ width: "25%" }}>From</th>
              <th style={{ width: "25%" }}>To</th>
              <th style={{ width: "10%" }}>Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {eventArray &&
              eventArray.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{v.tokenId}</td>
                    <td>{v.owner}</td>
                    <td>{v.sender}</td>
                    <td>{v.price / 10 ** 18} ETH</td>
                    <td>{moment.unix(v.time).format("YYYY/MM/DD-HH:mm:ss")}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Tab4;
