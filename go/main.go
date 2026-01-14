package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"
)

type Response struct {
	Message   string `json:"message"`
	Hostname  string `json:"hostname"`
	Timestamp string `json:"timestamp"`
	Language  string `json:"language"`
}

type HealthResponse struct {
	Status  string `json:"status"`
	Service string `json:"service"`
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	hostname, _ := os.Hostname()

	response := Response{
		Message:   "Hello from Go app!",
		Hostname:  hostname,
		Timestamp: time.Now().Format(time.RFC3339),
		Language:  "Go",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	response := HealthResponse{
		Status:  "healthy",
		Service: "golang-app",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/", mainHandler)
	http.HandleFunc("/health", healthHandler)

	log.Println("Go app listening on port 8080")
	if err := http.ListenAndServe("0.0.0.0:8080", nil); err != nil {
		log.Fatal(err)
	}
}
