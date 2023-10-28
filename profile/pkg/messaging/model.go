package messaging

import "context"

type MessageProcessor interface {
	Process(context.Context, []byte) error
}
