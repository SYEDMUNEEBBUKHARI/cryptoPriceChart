import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Market from "./containers/Market";

// import Web3 from "web3/dist/web3.min.js";
import {
  collection,
  where,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "./utils/firebaseApp";

import "./App.css";
import fetchAbi from "./artifacts/uniSwapRouter.abi";
// Dan's useInterval hook https://overreacted.io/making-setinterval-declarative-with-react-hooks/

//install web3-eth-contract
import tokenContext from "./context/tokenContext";

function App() {
  const [tokenData, setData] = useState("");
  useEffect(() => {
    (async function () {
      const q = query(
        collection(db, "pricecharts"),
        where("tokenName", "==", "oracle"),
        orderBy("date", "desc", true)
      );
      onSnapshot(q, (querySnapshot) => {
        setData(
          querySnapshot.docs.map((doc) => ({
            date: doc.data().date,
            price: doc.data().price
          }))
        );
      });
    })();

    // const c = collection(db, "pricecharts").where("tokenName", "==", "oracle");
    // let d = await getDocs(c);
    // const cityList = d.docs.map((doc) => doc.data());
    // console.log("===;", cityList);
  }, []);

  useEffect(() => {
   
  }, [tokenData]);

  const pickProfitToken = () => {
    const q = query(
      collection(db, "pricecharts"),
      where("tokenName", "==", "profit"),
      orderBy("date", "desc", true)
    );
    onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };
  return (
    <tokenContext.Provider value={tokenData.length > 0 && {tokenData}}>
      <div>
        <div style={{ height: "90vh" }}>
          <Routes>
            <Route exact path="/" element={<Market />} />
          </Routes>
          <Home />
        </div>
      </div>
    </tokenContext.Provider>
  );
}
export default App;
