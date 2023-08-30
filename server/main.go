package main

import (
	"chris/Stocks"
	"errors"
	"fmt"
	"io"
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
	fmt.Printf("got / request \n")
	io.WriteString(w, "This is the site\n")

}

func getHello(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("get /api/hello request\n")
	io.WriteString(w, "Hello, HTTP\n")
}
