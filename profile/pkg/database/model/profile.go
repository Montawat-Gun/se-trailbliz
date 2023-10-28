package model

import (
	"time"

	"gorm.io/gorm"
)

type Profile struct {
	Id        uint           `json:"id" gorm:"primaryKey"`
	FirstName string         `json:"firstName" gorm:"not null"`
	LastName  string         `json:"lastName" gorm:"not null"`
	BirthDate *time.Time     `json:"birthDate"`
	Gender    string         `json:"gender" gorm:"not null"`
	Address   *string        `json:"address"`
	Phone     *string        `json:"phone"`
	Email     string         `json:"email" gorm:"not null"`
	Type      string         `json:"type" gorm:"not null"`
	CreatedAt time.Time      `gorm:"autoCreateTime"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime:milli"`
	DeletedAt gorm.DeletedAt `gorm:"index"`

	Rewards []*Reward `gorm:"foreignKey:UserId"`
}

type ProfileUpdate struct {
}

type Reward struct {
	Id           uint       `json:"id" gorm:"primaryKey"`
	Name         string     `json:"name" gorm:"not null"`
	UserId       uint       `json:"userId" gorm:"not null"`
	Type         string     `json:"type" gorm:"not null"`
	ReceivedDate *time.Time `json:"receivedDate" gorm:"autoUpdateTime:milli"`
}
