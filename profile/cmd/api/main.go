package main

import (
	"log"
	"net/http"
	"time"
	"trailbliz/profile/pkg/database"
	"trailbliz/profile/pkg/handler"
)

func main() {
	database.ConnectDatabase()
	server := handler.NewRouter()

	s := &http.Server{
		Addr:         ":5004",
		Handler:      server,
		ReadTimeout:  1200 * time.Second,
		WriteTimeout: 1200 * time.Second,
	}

	if err := s.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
