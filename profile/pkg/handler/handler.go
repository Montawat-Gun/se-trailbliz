package handler

import (
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	router := gin.New()

	profileGroup := router.Group("/profile")
	NewProfileRouter(profileGroup)

	return router
}
