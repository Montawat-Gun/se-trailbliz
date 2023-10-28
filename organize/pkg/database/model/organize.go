package model

import (
	"time"

	"gorm.io/gorm"
)

type Organize struct {
	Id          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name" gorm:"not null"`
	Description *string        `json:"description"`
	Capability  int            `json:"capability" gorm:"not null"`
	DistanceKm  int            `json:"distanceKm" gorm:"not null"`
	Fee         float32        `json:"fee" gorm:"not null"`
	StartDate   time.Time      `json:"startDate" gorm:"not null"`
	EndDate     time.Time      `json:"endDate" gorm:"not null"`
	Lat         *float32       `json:"lat"`
	Lng         *float32       `json:"lng"`
	Reward      *string        `json:"reward"`
	CreatedAt   time.Time      `gorm:"autoCreateTime"`
	UpdatedAt   time.Time      `gorm:"autoUpdateTime:milli"`
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}

type UserOrganize struct {
	Id       uint     `json:"id" gorm:"primaryKey"`
	UserId   string   `json:"userId" gorm:"not null"`
	UserName string   `json:"userName" gorm:"not null"`
	UserType string   `json:"userType" gorm:"not null"`
	Organize Organize `gorm:"foreignKey:Id"`
}
