// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getStockData } from "./Api";
import { Stock } from "./StockType";

function App() {
  // const [count] = useState(0);
  // let stocks = JSON;
  let obj!: Stock;

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() =>
            getStockData("GME").then((res) => {
              obj = res;
            })
          }
        >
          Get Data
        </button>
        <button onClick={() => console.log(obj?.regularMarketPrice)}>
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
