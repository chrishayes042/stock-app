// import { useState } from "react";

import { useState, useEffect } from "react";
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
  const [ticker, setTicker] = useState("");

  async function getStocks(ticker: string) {
    setStocks(await getStockData(ticker));
  }

  useEffect(() => {
    if (stonks["Meta Data"] != undefined) {
      setStockTimeSeries();
    }
  }, [stonks]);
  function setStockTimeSeries() {
    const timeSeries = stonks["Time Series (5min)"];
    const parentKeys = Object.keys(timeSeries);
    lastKey = parentKeys[0];
    setStocksTS(stonks["Time Series (5min)"][lastKey]);
  }

  return (
    <>
      <div className="card">
        <input
          id="ticker"
          value={ticker}
          onChange={(e) => {
            setTicker(e.target.value);
          }}
        ></input>
        <button
          disabled={!ticker}
          onClick={() => {
            getStocks(ticker);
          }}
        >
          Get Stonks data
        </button>
        <button
          onClick={() => {
            // setStocksTS(stonks["Time Series (5min)"][getKey()]);
          }}
        >
          Stonks{" "}
        </button>

        {stonksTS["1. open"] ? (
          <p> Open: {stonksTS["1. open"]}</p>
        ) : (
          <p>Input Ticker Above</p>
        )}
        {stonksTS["4. close"] ? (
          <p> Close Price: {stonksTS["4. close"]} </p>
        ) : (
          <p></p>
        )}
        {stonks["Meta Data"] ? (
          <p>Symbol: {stonks["Meta Data"]["2. Symbol"]}</p>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
  // }
}

export default App;
