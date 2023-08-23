export interface StockTimeSeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface StockMetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": Date;
  "4. Output Size": string;
  "5. Time Zone": string;
}

export interface Stocks {
  "Meta Data": StockMetaData;
  "Time Series (5min)": { [key: string]: StockTimeSeries };
}
