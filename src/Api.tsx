import { Stocks } from "./StockType";

export async function getStockData(ticker: string): Promise<Stocks> {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${
    import.meta.env.VITE_YH_KEY
  }`;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": import.meta.env.VITE_YH_KEY,
  //     "X-RapidAPI-Host": "yh-finance-complete.p.rapidapi.com",
  //   },
  // };

  const response = await fetch(url);
  const stock: Stocks = await response.json();
  return stock;
}
