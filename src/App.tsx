// import { useState } from "react";

import { useState, useEffect } from "react";
import "./App.css";
import { getSingleDayStockData, getStockData, getStockTickerData } from "./Api";
import {
  Stocks,
  StockTimeSeries,
  StockTicker,
  BestMatch,
  SingleDayStock,
} from "./StockType";
import Loader from "./components/Loader.tsx";
import { useQuery } from "react-query";

function App() {
  let lastKey: string;
  const [stonks, setStocks] = useState<Stocks>(Object);
  const [stock, setStock] = useState<SingleDayStock>(Object);
  const [stonksTS, setStocksTS] = useState<StockTimeSeries>(Object);
  const [bestM, setBestM] = useState<StockTicker>(Object);
  const [ticker, setTicker] = useState("");

  async function getStocks(ticker: string) {
    setStock(await getSingleDayStockData(ticker));
  }

  // useEffect(() => {
  //   if (stonks["Meta Data"] != undefined) {
  //     setStockTimeSeries();
  //   }
  // }, [stonks]);
  // function setStockTimeSeries() {
  //   const timeSeries = stonks["Time Series (5min)"];
  //   const parentKeys = Object.keys(timeSeries);
  //   lastKey = parentKeys[0];
  //   setStocksTS(stonks["Time Series (5min)"][lastKey]);
  // }

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
        <div>
          <button
            disabled={!ticker}
            onClick={() => {
              getStocks(ticker);
            }}
          >
            Get Stonks data
          </button>
        </div>
        {stock["Global Quote"] ? (
          <div>
            {/* <p>Symbol: {stock["Global Quote"]["01. symbol"]}</p> */}
            <p>Open: {stock["Global Quote"]["02. open"]}</p>
            <p>Close: {stock["Global Quote"]["05. price"]}</p>
            <p>Volume: {stock["Global Quote"]["06. volume"]}</p>
            <p>
              Last Trading: {stock["Global Quote"]["07. latest trading day"]}
            </p>
            <p>Previous Close: {stock["Global Quote"]["08. previous close"]}</p>
            <p>Change %: {stock["Global Quote"]["10. change percent"]}</p>
            <p>Change: {stock["Global Quote"]["09. change"]}</p>
          </div>
        ) : (
          <p>Input Ticker Above</p>
        )}
      </div>
    </>
  );
  // }
}

export default App;
