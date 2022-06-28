import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3/dist/web3.min.js";

import fetchAbi from "../../artifacts/uniSwapRouter.abi";
// Dan's useInterval hook https://overreacted.io/making-setinterval-declarative-with-react-hooks/

//install web3-eth-contract

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}
function Home() {
  const findPricesAndInsertInDb = () => {
    
  }
  const setAbi = async (data) => {
    let abi = await data.then((data) => data);
    return abi;
  };

  async function fetchTheAbi(setAbi) {
    let d = await fetch(fetchAbi);
    let s = setAbi(d.text());
    return s;
  }
  const [contractAbi, setContractAbi] = useState("");
  useEffect(() => {
    // fetchAbiInterface.then((abiInterface) => {
    //   setContractAbi(
    //     new Contract(
    //       JSON.parse(abiInterface),
    //       "0x73E93D9657E6f32203f900fe1BD81179a5bf6Ce4"
    //     )
    //   );
    // });
  }, []);
  let [requestCount, setRequestCount] = useState(0);

  // Run every minute
  const delay = 60000;

  useInterval(() => {
    // Make the request here
    setRequestCount(requestCount + 1);
    (async function () {
      let fetchAbiInterface = await fetchTheAbi(setAbi);

      const web3 = new Web3();
      web3.setProvider("http://167.99.250.50:9650/ext/bc/C/rpc");

      const contract = new web3.eth.Contract(
        JSON.parse(fetchAbiInterface),
        "0x73E93D9657E6f32203f900fe1BD81179a5bf6Ce4"
      );
      console.log(contract);
      const ORACLE_ADDRESS = "0xd7565b16b65376e2ddb6c71e7971c7185a7ff3ff";
      const WSB_ADDRESS = "0x02f0826ef6ad107cfc861152b32b52fd11bab9ed";
      const data = await contract.methods
        .getAmountsOut(Web3.utils.toWei("1"), [
          WSB_ADDRESS,
          ORACLE_ADDRESS,
          "0xf810576A68C3731875BDe07404BE815b16fC0B4e",
        ])
        .call();
      console.log("data===.", data);
      //find prices and insert in db
    })();
  }, delay);

  return <h1>{requestCount}</h1>;
}
export default Home;
