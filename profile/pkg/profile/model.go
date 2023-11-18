package profile

import (
	"time"

	"github.com/google/uuid"
)

type MessageEvent struct {
	Id   uuid.UUID
	Data RetrieveReward
}

type ProfileUpdate struct {
	FirstName     string     `json:"firstName" gorm:"not null"`
	LastName      string     `json:"lastName" gorm:"not null"`
	BirthDate     *time.Time `json:"birthDate"`
	Gender        string     `json:"gender" gorm:"not null"`
	Address       *string    `json:"address"`
	Phone         *string    `json:"phone"`
	Email         string     `json:"email" gorm:"not null"`
	Disease       string     `json:"disease"`
	FoodAllergies string     `json:"foodAllergies"`
}

type RetrieveReward struct {
	Reward        *string         `json:"reward"`
	UsersOrganize []*UserOrganize `json:"usersOrganize"`
}

type UserOrganize struct {
	UserId   uint   `json:"userId"`
	UserName string `json:"userName"`
	UserType string `json:"userType"`
}
