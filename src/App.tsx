import { useState, useEffect } from "react";
import { Chart, ChartData, ChartOptions } from "chart.js";

import "./App.css";

import { getSingleDayStockData } from "./Api";
import {
  // Stocks,
  // StockTimeSeries,
  // StockTicker,
  // BestMatch,
  SingleDayStock,
} from "./StockType";

// import Loader from "./components/Loader.tsx";
// import { useQuery } from "react-query";

function App() {
  const [stock, setStock] = useState<SingleDayStock>(Object);
  const [ticker, setTicker] = useState("");

  async function getStocks(ticker: string) {
    setStock(await getSingleDayStockData(ticker));
    getChart();
  }
  const ctx = document.getElementById("myChart") as HTMLCanvasElement;

  function getChart() {
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["High", "Low", "Close"],
        datasets: [
          {
            data: [
              stock["Global Quote"]["03. high"],
              stock["Global Quote"]["04. low"],
              stock["Global Quote"]["05. price"],
            ],
            backgroundColor: ["blue"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
  // useEffect(() => {
  //   if (ticker != undefined) {
  //     setStock(null);
  //   }
  // }, [ticker]);
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
        <canvas id="myChart" width={499} height={500}></canvas>
      </div>
    </>
  );
  // }
}

export default App;
