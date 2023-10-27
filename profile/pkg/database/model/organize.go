package model

import (
	"time"

	"gorm.io/gorm"
)

type Organize struct {
	Id          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Capability  int            `json:"capability"`
	DistanceKm  int            `json:"distanceKm"`
	Fee         float32        `json:"fee"`
	StartDate   time.Time      `json:"startDate"`
	EndDate     time.Time      `json:"endDate"`
	Lat         float32        `json:"lat"`
	Lng         float32        `json:"lng"`
	CreatedAt   time.Time      `gorm:"autoCreateTime"`
	UpdatedAt   time.Time      `gorm:"autoUpdateTime:milli"`
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}

type OrganizeUpdate struct {
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Capability  int       `json:"capability"`
	DistanceKm  int       `json:"distanceKm"`
	Fee         float32   `json:"fee"`
	StartDate   time.Time `json:"startDate"`
	EndDate     time.Time `json:"endDate"`
	Lat         float32   `json:"lat"`
	Lng         float32   `json:"lng"`
}
