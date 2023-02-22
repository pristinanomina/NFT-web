import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";

const Tab = (props) => {
  let [index, setIndex] = useState(0);
  let count = props.count;
  let membership = props.membership;
  let account = props.account;
  let instance = props.instance;
  let instance2 = props.instance2;

  const TabContent = (props) => {
    if (props.index === 0) {
      return (
        <div>
          <div>현재 계정은 [{membership}] 입니다.</div>
          <br></br>
          <div>[Member] 계정만 입장 가능.</div>
          <div>[Market]에서 NFT 회원권 구매 후 입장.</div>
        </div>
      );
    } else if (props.index === 1) {
      if (count === 0) {
        alert("회원이 아닙니다.");
        window.location.reload();
        return;
      } else {
        return (
          <div>
            <Tab1 account={account} instance2={instance2} />
          </div>
        );
      }
    } else if (props.index === 2) {
      if (count === 0) {
        return <div>토큰이 존재하지 않습니다.</div>;
      } else {
        return (
          <div>
            <Tab2 account={account} instance={instance} />
          </div>
        );
      }
    } else if (props.index === 3) {
      return (
        <div>
          NFT for Sale
          <Tab3 account={account} instance={instance} />
        </div>
      );
    } else if (props.index === 4) {
      return (
        <div>
          <Tab4 account={account} instance={instance} />
        </div>
      );
    }
  };

  if (props.count === 0) {
    return (
      <div>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link
              eventkey="link-0"
              onClick={() => {
                setIndex(0);
              }}
            >
              Main
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Member Only
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-2"
              onClick={() => {
                setIndex(2);
              }}
            >
              My NFT
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-3"
              onClick={() => {
                setIndex(3);
              }}
            >
              Market
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-4"
              onClick={() => {
                setIndex(4);
              }}
            >
              Trade Log
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent index={index} />
      </div>
    );
  } else {
    return (
      <div>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link
              eventkey="link-0"
              onClick={() => {
                setIndex(0);
              }}
            >
              Main
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={() => {
                setIndex(1);
              }}
            >
              Member Only
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-2"
              onClick={() => {
                setIndex(2);
              }}
            >
              My NFT
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-3"
              onClick={() => {
                setIndex(3);
              }}
            >
              Market
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-4"
              onClick={() => {
                setIndex(4);
              }}
            >
              Trade Log
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent index={index} />
      </div>
    );
  }
};

export default Tab;
