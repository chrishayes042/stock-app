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
	"strings"

	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
)

func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("/api/singleDayStock", getRoot)
	mux.HandleFunc("/api/hello", getHello)

	err := http.ListenAndServe(":3333", mux)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("Server closed\n")

	} else if err != nil {
		fmt.Printf("error starting server :%s\n", err)
		os.Exit(1)
	}
}
func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func getRoot(w http.ResponseWriter, r *http.Request, ps httprouter.Param) {
	key := goDotEnvVariable("API_KEY")
	response, err := http.Get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey="+key, "))
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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(resObject)

}

func getHello(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("get /api/hello request\n")
	io.WriteString(w, "Hello, HTTP\n")
}
