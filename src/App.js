import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/home";
import Market from "./containers/Market";

import Web3 from "web3/dist/web3.min.js";

import "./App.css";
import fetchAbi from "./artifacts/uniSwapRouter.abi";
// Dan's useInterval hook https://overreacted.io/making-setinterval-declarative-with-react-hooks/

//install web3-eth-contract

function App() {
  return (
    <div>
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
