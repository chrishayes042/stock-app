package main

import (
	"api/pkg/model"
	"encoding/json"
	"errors"
	"fmt"
	"io"

	"log"
	"net/http"
	"os"
)

func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("/", getRoot)
	mux.HandleFunc("/api/hello", getHello)

	err := http.ListenAndServe(":3333", mux)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("Server closed\n")

	} else if err != nil {
		fmt.Printf("error starting server :%s\n", err)
		os.Exit(1)
	}
}

func getRoot(w http.ResponseWriter, r *http.Request) {
	response, err := http.Get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GME&apikey=SX48BBQ29ZGLWWJY")
	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}
	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(responseData))

	var resObject model.SingleDayStock

	fmt.Print(json.Unmarshal(responseData, &resObject))
	fmt.Println(resObject)

	// stocks := &model.SingleDayStock{model.StockArray{
	// 	model.SingleDayStockArray{Symbol: "GME", Open: "2", High: "3", Low: "2", Price: "4", Volume: "1000", LastestTradingDay: "today", PreviousClose: "2", Change: "2", ChangePct: "1"},
	// }}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(resObject)

}

func getHello(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("get /api/hello request\n")
	io.WriteString(w, "Hello, HTTP\n")
}
