package model

type SingleDayStock struct {
	globalQuote []SingleDayStockArray `json:"Global Quote"`
}
type SingleDayStockArray struct {
	symbol            string `json:"01. symbol"`
	open              string `json:"02. open"`
	high              string `json:"03. high"`
	low               string `json:"04. low"`
	price             string `json:"05. price"`
	volume            string `json:"06. volume"`
	lastestTradingDay string `json:"07. latest trading day"`
	previousClose     string `json:"08. previous close"`
	change            string `json:"09. change"`
	changePct         string `json:"10. change percent"`
}
