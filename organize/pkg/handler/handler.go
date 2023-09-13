package handler

import (
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	router := gin.New()

	organizeGroup := router.Group("/organize")
	NewOrganizeRouter(organizeGroup)

	return router
}
