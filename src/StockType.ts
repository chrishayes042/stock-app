export interface Stock {
  symbol: string;
  price: number;
  shortName: string;
  marketCap: number;
  priceEpsCurrentYear: number;
  regularMarketDayRange: string[];
  regularMarketPrice: number;
}
