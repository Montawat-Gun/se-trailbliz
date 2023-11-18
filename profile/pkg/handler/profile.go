package handler

import (
	"trailbliz/profile/pkg/messaging"
	"trailbliz/profile/pkg/profile"

	"github.com/gin-gonic/gin"
)

func NewProfileRouter(router *gin.RouterGroup) {
	s := &profile.Service{
		ProfileRepository: profile.NewRepository(),
	}
	var service profile.ProfileService = s
	router.GET("", service.GetAll)
	router.GET(":id", service.Get)
	router.GET("getByUserIdRef/:userId", service.GetByUserIdRef)
	router.POST("", service.Create)
	router.PUT(":id", service.Update)
	router.DELETE(":id", service.Delete)

	go messaging.Subscribe("certificate", service)
}
