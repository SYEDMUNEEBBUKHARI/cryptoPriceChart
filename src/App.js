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
} from "firebase/firestore";
import { db } from "./utils/firebaseApp";

import "./App.css";
import fetchAbi from "./artifacts/uniSwapRouter.abi";
// Dan's useInterval hook https://overreacted.io/making-setinterval-declarative-with-react-hooks/

//install web3-eth-contract

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const q = query(
      collection(db, "pricecharts"),
      where("tokenName", "==", "oracle")
    );
    onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {}, [data]);
  return (
    <div>
      {console.log("data", data)}
      <div style={{ height: "90vh" }}>
        <Routes>
          <Route exact path="/" element={<Market />} />
        </Routes>
        <Home />
      </div>
    </div>
  );
}
export default App;
