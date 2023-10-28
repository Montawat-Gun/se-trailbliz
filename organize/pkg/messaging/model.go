package messaging

import "github.com/google/uuid"

type MessageEvent struct {
	Id   uuid.UUID
	Data interface{}
}
