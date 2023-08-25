// import { useState } from "react";

import { useState, useEffect, useRef } from "react";
import "./App.css";
import { getStockData, getStockTickerData } from "./Api";
import { Stocks, StockTimeSeries, StockTicker, BestMatch } from "./StockType";
import Loader from "./components/Loader.tsx";
import { useQuery } from "react-query";

function App() {
  let lastKey: string;
  const [stonks, setStocks] = useState<Stocks>(Object);
  const [stonksTS, setStocksTS] = useState<StockTimeSeries>(Object);
  const [bestM, setBestM] = useState<StockTicker>(Object);
  let stockTicker!: StockTicker;
  const [error, setError] = useState({});
  function getStocks() {
    getStockData("GME")
      .then((res) => setStocks(res))
      .catch((error) => setError(error));
  }

  function getKey() {
    const timeSeries = stonks["Time Series (5min)"];
    const parentKeys = Object.keys(timeSeries);
    lastKey = parentKeys[0];

    return lastKey;
  }

  return (
    <>
      <div className="card">
        <input
          onChange={(e) =>
            getStockTickerData(e.target.value).then((res) => setBestM(res))
          }
        ></input>
        <button
          onClick={() => {
            getStocks();
          }}
        >
          Get Stonks data
        </button>
        <button
          onClick={() => {
            setStocksTS(stonks["Time Series (5min)"][getKey()]);
          }}
        >
          Stonks{" "}
        </button>
        {/* {stonks ? (
          <p>Symbol: {stonks["Meta Data"]["2. Symbol"]}</p>
        ) : (
          <p>Loading...</p>
        )} */}
        {stonksTS ? <p> Close Price: {stonksTS["4. close"]} </p> : <p></p>}
        {stonksTS ? <p>Symbol: {stonksTS["1. open"]}</p> : <p>Loading...</p>}
        {stonks["Meta Data"] ? (
          <p>Symbol: {stonks["Meta Data"]["2. Symbol"]}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
  // }
}

export default App;
