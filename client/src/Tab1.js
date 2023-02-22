import React, { useEffect, useState, useCallback } from "react";
import { Table } from "react-bootstrap";

const Tab1 = (props) => {
  const [eventArray, setEventArray] = useState([]);
  const [content, setContent] = useState("");

  const contentSet = async ({ target: { value } }) => {
    setContent(value);
  };

  const events = useCallback(async () => {
    const event = await props.instance2.getPastEvents("Message", {
      fromBlock: 0,
      toBlock: "latest",
    });

    let events =
      event &&
      event.map((v) => {
        return v.returnValues;
      });

    setEventArray(events);
  }, [props.instance2]);

  const write = async () => {
    await props.instance2.methods.write(content).send({ from: props.account });
  };

  useEffect(() => {
    events();
  }, [props.account, eventArray, events]);

  return (
    <div>
      <div>[Member] 계정만 열람 가능.</div>
      <input name="content" value={content} onChange={contentSet}></input>
      <button onClick={write}>write</button>
      <div>
        <Table striped bordered style={{ width: "99%" }}>
          <thead>
            <tr>
              <th style={{ width: "3%" }}>#</th>
              <th style={{ width: "10%" }}>Address</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {eventArray &&
              eventArray.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {props.account === v._address ? (
                        <div style={{ color: "blue" }}>{v._address}</div>
                      ) : (
                        v._address
                      )}
                    </td>
                    <td>{v._message}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Tab1;
