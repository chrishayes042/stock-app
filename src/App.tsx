// import { useState } from "react";

import { useState, useEffect } from "react";
import "./App.css";
import { getStockData } from "./Api";
import { Stock } from "./StockType";
import Loader from "./components/Loader.tsx";

function App() {
  // const [count] = useState(0);
  // let stocks = JSON;
  let obj!: Stock;

  const [stonks, setStocks] = useState(obj);
  const [error, setError] = useState({});
  useEffect(() => {
    getStockData("GME")
      .then((res) => setStocks(res))
      .catch((err) => setError(err));
  }, []);

  return (
    <>
      <div className="card">
        <button
          onClick={() =>
            getStockData("GME").then((res) => {
              setStocks(res);
            })
          }
        >
          Get Data
        </button>
        <div>{stonks == undefined ? <Loader /> : stonks.marketCap}</div>
        {/* <button onClick={() => console.log("hi")}>Stonks </button> */}
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
