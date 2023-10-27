package model

import (
	"time"

	"gorm.io/gorm"
)

type Profile struct {
	Id        uint           `json:"id" gorm:"primaryKey"`
	FirstName string         `json:"firstName"`
	LastName  string         `json:"lastName"`
	BirthDate *time.Time     `json:"birthDate"`
	Gender    string         `json:"gender"`
	Address   *string        `json:"address"`
	Phone     *string        `json:"phone"`
	Email     *string        `json:"email"`
	CreatedAt time.Time      `gorm:"autoCreateTime"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime:milli"`
	DeletedAt gorm.DeletedAt `gorm:"index"`

	Certificates []Certificate `gorm:"foreignKey:UserRefer"`
}

type ProfileUpdate struct {
}

type Certificate struct {
	Id           uint       `json:"id" gorm:"primaryKey"`
	Name         string     `json:"name"`
	UserId       uint       `json:"userName"`
	ReceivedDate *time.Time `json:"receivedDate"`
}
