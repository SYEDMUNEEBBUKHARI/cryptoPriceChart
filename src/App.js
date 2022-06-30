import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Market from "./containers/Market";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
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
  const [searchToken, setSearchToken] = useState("oracle");
  useEffect(() => {
    dayNumbers(1);
  }, []);

  useEffect(() => {}, [tokenData]);
  useEffect(() => {
    dayNumbers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchToken]);

  //day switch

  const daySwitch = (data) => {
    // eslint-disable-next-line default-case
    switch (data) {
      case "1":
      case "7d":
        if (data === "1d") {
          console.log("---==1d--==");
          dayNumbers(1);
        } else if (data === "7d") {
          console.log("---==7d--==");

          dayNumbers(7);
        }
        break;
      case "1m":
      case "3m":
      case "1y":
      case "all":
        if (data === "1m") {
          console.log("---==1m--==");

          subtractMonths(1);
        } else if (data === "3m") {
          console.log("---==3m--==");

          subtractMonths(3);
        } else if (data === "all") {
          console.log("---==all--==");

          getAllData();
        } else {
          console.log("---==1y--==");

          subtractMonths(12);
        }
        break;
      default:
        break;
    }
  };

  const dayNumbers = (num) => {
    let myCurrentDate = new Date();
    let myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - num);

    const q = query(
      collection(db, "pricecharts"),
      where("tokenName", "==", searchToken),
      where(
        "date",
        ">",
        myPastDate.toLocaleString("en-US", { timeZone: "UTC" })
      ),
      orderBy("date", "asc", true)
    );
    onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          date: doc.data().date,
          price: doc.data().price,
          tokenName: doc.data().tokenName,
        }))
      );
    });
  };
  //days button switch

  function subtractMonths(numOfMonths, date = new Date()) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);

    const q = query(
      collection(db, "pricecharts"),
      where("tokenName", "==", searchToken),
      where("date", ">", dateCopy.toLocaleString("en-US", { timeZone: "UTC" })),
      orderBy("date", "asc", true)
    );
    onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          date: doc.data().date,
          price: doc.data().price,
        }))
      );
    });

    return q;
  }

  const getAllData = (date = new Date()) => {
    const dateCopy = new Date(date.getTime());

    const q = query(
      collection(db, "pricecharts"),
      where("tokenName", "==", searchToken),
      where("date", "<", dateCopy.toLocaleString("en-US", { timeZone: "UTC" })),
      orderBy("date", "asc", true)
    );
    onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          date: doc.data().date,
          price: doc.data().price,
        }))
      );
    });

    return q;
  };

  const pickProfitToken = (tokenName) => {
    const q = query(
      collection(db, "pricecharts"),
      where("tokenName", "==", tokenName),
      orderBy("date", "asc", true)
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
    <tokenContext.Provider
      value={tokenData.length > 0 && { tokenData, daySwitch }}
    >
      <ToggleButtonGroup
        color="primary"
        value={searchToken}
        exclusive
        onChange={(e) => setSearchToken(e.currentTarget.value)}
      >
        <ToggleButton value="oracle">Oracle</ToggleButton>
        <ToggleButton value="profit">Profit</ToggleButton>
      </ToggleButtonGroup>
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
