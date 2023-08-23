// import { useState } from "react";

import { useState, useEffect } from "react";
import "./App.css";
import { getStockData } from "./Api";
import { Stocks, StockTimeSeries } from "./StockType";
import Loader from "./components/Loader.tsx";

function App() {
  let stocks!: Stocks;
  let lastKey: string;
  let stockObj!: StockTimeSeries;
  const [stonks, setStocks] = useState(stocks);
  const [stonksTS, setStocksTS] = useState(stockObj);
  const [error, setError] = useState({});
  useEffect(() => {
    getStockData("GME")
      .then((res) => setStocks(res))
      .catch((err) => setError(err));
    // getKey();
  }, []);

  function getKey() {
    const timeSeries = stonks["Time Series (5min)"];
    const parentKeys = Object.keys(timeSeries);
    lastKey = parentKeys[0];
    setStocksTS(stonks["Time Series (5min)"][lastKey]);
  }

  return (
    <>
      <div className="card">
        {/* <button
          onClick={() =>
            getStockData("GME").then((res) => {
              setStocks(res);
            })
          }
        >
          Get Data
        </button> */}
        {/* <div>
          {stonks == undefined ? (
            <Loader />
          ) : (
            stonks["Time Series (5min)"][lastKey]["4. close"]
          )}
        </div> */}
        <button onClick={() => getKey()}>Click me</button>
        <button
          onClick={() =>
            console.log(
              // stonks["Time Series (5min)"][lastKey]["4. close"]
              lastKey
              // currentTime.toISOString().replace("T", " ").replace("Z", "")
            )
          }
        >
          Stonks{" "}
        </button>
        <p id="p"></p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
