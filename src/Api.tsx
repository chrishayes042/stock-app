import { Stock } from "./StockType";

export async function getStockData(ticker: string): Promise<Stock> {
  const url = `https://yh-finance-complete.p.rapidapi.com/fullData?ticker=${ticker}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_YH_KEY,
      "X-RapidAPI-Host": "yh-finance-complete.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const stock: Stock = await response.json();

  return stock;
}
