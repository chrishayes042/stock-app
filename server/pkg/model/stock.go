package model

type SingleDayStock struct {
	GlobalQuote SingleDayStockArray `json:"Global Quote"`
}
type SingleDayStockArray struct {
	Symbol           string `json:"01. symbol"`
	Open             string `json:"02. open"`
	High             string `json:"03. high"`
	Low              string `json:"04. low"`
	Price            string `json:"05. price"`
	Volume           string `json:"06. volume"`
	LatestTradingDay string `json:"07. latest trading day"`
	PreviousClose    string `json:"08. previous close"`
	Change           string `json:"09. change"`
	ChangePct        string `json:"10. change percent"`
}
type StockArray []SingleDayStockArray
