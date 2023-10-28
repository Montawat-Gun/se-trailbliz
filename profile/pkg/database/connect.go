package database

import (
	"trailbliz/profile/pkg/database/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "host=localhost user=postgres password=sBv5pl3gL2wBU0uG dbname=profileDB port=5432 sslmode=disable TimeZone=Asia/Bangkok"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&model.Profile{})
	db.AutoMigrate(&model.Reward{})
	DB = db
}
