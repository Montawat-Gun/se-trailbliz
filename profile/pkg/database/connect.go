package database

import (
	"fmt"
	"log"
	"os"
	"trailbliz/profile/pkg/database/model"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// โหลดไฟล์ .env
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	// ดึงค่าจากตัวแปรสภาพแวดล้อม
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	sslmode := os.Getenv("DB_SSLMODE")
	timezone := os.Getenv("DB_TIMEZONE")

	rabbitMQURL := os.Getenv("RABBITMQ_URL")
	log.Printf("RabbitMQ URL: %s", rabbitMQURL)

	// สร้าง DSN จากตัวแปรสภาพแวดล้อม
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s", host, user, password, dbname, port, sslmode, timezone)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&model.Profile{})
	db.AutoMigrate(&model.Reward{})
	DB = db
}
