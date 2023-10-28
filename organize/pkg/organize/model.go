package organize

import (
	"time"
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
	UserId     uint   `json:"userId"`
	OrganizeId uint   `json:"organizeId"`
	UserName   string `json:"userName"`
	UserType   string `json:"userType"`
}

type EndOrganizeModel struct {
	OrganizeId uint `json:"organizeId"`
}
