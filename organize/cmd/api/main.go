package main

import (
	"log"
	"net/http"
	"time"
	"trailbliz/organize/pkg/database"
	"trailbliz/organize/pkg/handler"
)

func main() {
	database.ConnectDatabase()
	server := handler.NewRouter()

	s := &http.Server{
		Addr:         ":5003",
		Handler:      server,
		ReadTimeout:  1200 * time.Second,
		WriteTimeout: 1200 * time.Second,
	}

	if err := s.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
