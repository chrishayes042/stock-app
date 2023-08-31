import { Stocks, StockTicker, SingleDayStock } from "./StockType";

const apiKey = import.meta.env.VITE_YH_KEY;

export async function getStockData(ticker: string): Promise<Stocks> {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${apiKey}`;

  const response = await fetch(url);
  const stock: Stocks = await response.json();
  return stock;
}

export async function getSingleDayStockData(): Promise<SingleDayStock> {
  const url = `http://localhost:3333/api/singleDayStock`;
  const response = await fetch(url);
  const stock: SingleDayStock = await response.json();
  return stock;
}

export async function getStockTickerData(ticker: string): Promise<StockTicker> {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${apiKey}`;

  const res = await fetch(url);
  const st: StockTicker = await res.json();
  return st;
}
