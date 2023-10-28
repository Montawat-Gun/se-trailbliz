package profile

import "github.com/google/uuid"

type MessageEvent struct {
	Id   uuid.UUID
	Data RetrieveReward
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
