package organize

import (
	"time"
	"trailbliz/organize/pkg/database/model"
)

type OrganizeUpdate struct {
	Name        string    `json:"name"`
	Description *string   `json:"description"`
	Capability  int       `json:"capability"`
	DistanceKm  int       `json:"distanceKm"`
	Fee         float32   `json:"fee"`
	StartDate   time.Time `json:"startDate"`
	EndDate     time.Time `json:"endDate"`
	Lat         *float32  `json:"lat"`
	Lng         *float32  `json:"lng"`
	Reward      *string   `json:"reward"`
}

type UserOrganizeCreate struct {
	UserId   string         `json:"userId" gorm:"not null"`
	UserName string         `json:"userName" gorm:"not null"`
	UserType string         `json:"userType" gorm:"not null"`
	Organize model.Organize `gorm:"foreignKey:Id"`
}
