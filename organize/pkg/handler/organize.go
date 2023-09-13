package handler

import (
	"trailbliz/organize/pkg/organize"

	"github.com/gin-gonic/gin"
)

func NewOrganizeRouter(router *gin.RouterGroup) {
	s := &organize.Service{
		OrganizeRepository: organize.NewRepository(),
	}
	var service organize.OrganizeService = s
	router.GET("", service.GetAll)
	router.GET(":id", service.Get)
	router.POST("", service.Create)
	router.PUT(":id", service.Update)
	router.DELETE(":id", service.Delete)
}
