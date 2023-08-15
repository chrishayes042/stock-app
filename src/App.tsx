// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count] = useState(0);
  // let stocks = JSON;
  let obj: Stock | undefined = undefined;
  interface Stock {
    symbol: string;
    price: number;
  }

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
        <button onClick={() => getStockData("GME")}>Get Data</button>
        <button onClick={() => console.log(obj?.symbol)}>Stonks </button>
        {/* <p>{obj.symbol}</p> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
  async function getStockData(ticker: string) {
    const url = `https://yh-finance-complete.p.rapidapi.com/fullData?ticker=${ticker}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_YH_KEY,
        "X-RapidAPI-Host": "yh-finance-complete.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      // const result = await response.json();
      // stocks = await response.json();
      obj = await response.json();
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

export default App;
