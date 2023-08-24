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
  let isFetched = false;
  const [error, setError] = useState({});
  function getStocks() {
    getStockData("GME")
      .then((res) => setStocks(res))
      .catch((error) => setError(error));
    console.log("getting data");
    console.log(stonks);
    getKey();
  }

  function getKey() {
    const timeSeries = stonks["Time Series (5min)"];
    const parentKeys = Object.keys(timeSeries);
    lastKey = parentKeys[0];
    setStocksTS(stonks["Time Series (5min)"][lastKey]);
    console.log("parsing data");
    console.log(stonks["Time Series (5min)"][lastKey]["4. close"]);
    isFetched = true;
  }
  // if (isFetched) {
  return (
    <>
      <div className="card">
        <button onClick={() => getStocks()}>Get Stonks data</button>
        <button
          onClick={() =>
            console.log(
              // stonks["Time Series (5min)"][lastKey]["4. close"]
              stonksTS["4. close"]
              // currentTime.toISOString().replace("T", " ").replace("Z", "")
            )
          }
        >
          Stonks{" "}
        </button>
        {isFetched && <p>stonksTS["4. close"]</p>}
        {/* <p id="p">{stonksTS["4. close"]}</p> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
  // }
}

export default App;
