/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";
import ERC721Token from "./contracts/ERC721Token.json";
import Board from "./contracts/Board.json";
import getWeb3 from "./getWeb3";
import Tab from "./Tab";

const projectId = "2EZHaZW48VE1PdYTxFXusmSRC9K";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfsClient = require("ipfs-http-client");

const client = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

let id = 0;
let desc = "Membership NFT";
let img = "ipfs://QmbfuVu8rFBnFUR4cp4JNa9bY812GhBqVSYym2pLLrAeuK";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [instance, setInstance] = useState(null);
  const [instance2, setInstance2] = useState(null);
  const [balance, setBalance] = useState("");
  const [count, setCount] = useState(0);
  const [membership, setMembership] = useState("Guest");
  const [array, setArray] = useState([]);
  const host = "0x8d62FFeaA010E618056a960a0d0F93b2D4B6479e";

  let res = "";
  let tempArray = [];

  useEffect(() => {
    setUp();
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
      setUp();
    });
  }, []);

  useEffect(() => {
    if (instance) {
      NFTbalanceOf();
    }
  }, [instance]);

  useEffect(() => {
    if (count === 0) {
      setMembership("Guest");
    } else {
      setMembership("Member");
    }

    NFTown();
  }, [count]);

  const setUp = useCallback(async () => {
    const web3 = await getWeb3();
    await setContract(web3);
  }, []);

  const setContract = useCallback(async (web3) => {
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const balance = await web3.eth.getBalance(accounts[0]);

    const information = ERC721Token.networks[networkId];
    const information2 = Board.networks[networkId];

    const instance = new web3.eth.Contract(
      ERC721Token.abi,
      information && information.address
    );

    const instance2 = new web3.eth.Contract(
      Board.abi,
      information2 && information2.address
    );

    setWeb3(web3);
    setAccount(accounts[0]);
    setInstance(instance);
    setInstance2(instance2);
    setBalance(balance);
  }, []);

  const ERC721MetadataSchema = (id) => {
    return {
      title: "Asset Metadata",
      type: "object",
      properties: {
        name: {
          type: "string",
          description: id,
        },
        description: {
          type: "string",
          description: desc,
        },
        image: {
          type: "string",
          description: img,
        },
      },
    };
  };

  const mintNFT = async () => {
    id = (await TotalNFT()) + 1;

    const NFTmetaData = ERC721MetadataSchema(id);
    console.log("token id:", id);

    res = await client.add(Buffer.from(JSON.stringify(NFTmetaData)));

    const ipfsContent = "https://soliszt.infura-ipfs.io/ipfs/" + res.path;
    console.log("hash:", res.path);
    console.log("ipfs:", ipfsContent);
  };

  const mint = async () => {
    await mintNFT();

    try {
      const response = await instance.methods
        .minting(res.path)
        .send({ from: account });
      console.log(response);
      setUp();
    } catch (error) {
      console.error(error);
    }
  };

  const TotalNFT = async () => {
    return parseInt(await instance.methods.totalSupply().call());
  };

  const NFTbalanceOf = async () => {
    setCount(parseInt(await instance.methods.balanceOf(account).call()));
  };

  const NFTtokenOfOwnerByIndex = async (address, index) => {
    return await instance.methods.tokenOfOwnerByIndex(address, index).call();
  };

  const NFTown = async () => {
    tempArray = [];

    for (var i = 0; i < count; i++) {
      var NFT_id = await NFTtokenOfOwnerByIndex(account, i);
      tempArray.push(NFT_id);
    }
    setArray([...tempArray]);
  };

  if (!web3) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        MetaMask Login
      </div>
    );
  }

  return (
    <div>
      <h1
        style={{
          background: "black",
          height: "100px",
          paddingTop: "30px",
          paddingLeft: "30px",
          fontSize: "30px",
          color: "white",
        }}
      >
        NFT를 이용한 Web DApp
      </h1>

      <div style={{ paddingLeft: 20, paddingTop: 20, fontSize: "20px" }}>
        지갑 주소 : {account}
        <br></br>
        회원 정보 : {membership}
        <br></br>
        이더리움 잔액 : {web3.utils.fromWei(balance, "ether").substr(0, 6)} ETH
        <br></br>
        <br></br>
        {account === host ? (
          <button onClick={mint}>NFT 발행</button>
        ) : (
          <div></div>
        )}
        <a
          href="https://sepolia.etherscan.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Etherscan</button>
        </a>
        <br></br>
      </div>
      <hr></hr>
      <div style={{ paddingLeft: 20, fontSize: "20px" }}>
        <Tab
          account={account}
          instance={instance}
          instance2={instance2}
          count={count}
          array={array}
          membership={membership}
        />
      </div>
    </div>
  );
};

export default App;
