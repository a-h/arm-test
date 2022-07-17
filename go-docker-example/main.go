package main

import (
	"io"
	"net/http"
)

func main() {
	http.ListenAndServe(":3000", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		io.WriteString(w, "Hello, World!")
	}))
}
