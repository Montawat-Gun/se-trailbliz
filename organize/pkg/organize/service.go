package organize

import (
	"fmt"
	"net/http"
	"strconv"
	"trailbliz/organize/pkg/database/model"
	"trailbliz/organize/pkg/messaging"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Service struct {
	OrganizeRepository
}

type OrganizeService interface {
	GetAll(c *gin.Context)
	Get(c *gin.Context)
	Create(c *gin.Context)
	Update(c *gin.Context)
	Delete(c *gin.Context)

	ApplyOrganize(c *gin.Context)
	EndOrganize(c *gin.Context)
}

func (s *Service) GetAll(c *gin.Context) {
	result, err := s.OrganizeRepository.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
	}
	c.JSON(http.StatusOK, gin.H{"data": result})
}

func (s *Service) Get(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	result, err := s.OrganizeRepository.Get(uint(id))
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": result})
}

func (s *Service) Create(c *gin.Context) {
	var neworganize model.Organize
	c.BindJSON(&neworganize)
	result, err := s.OrganizeRepository.Create(&neworganize)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": result})
}

func (s *Service) Update(c *gin.Context) {
	var organizeUpdate OrganizeUpdate
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	if err := c.ShouldBindJSON(&organizeUpdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	result, err := s.OrganizeRepository.Update(uint(id), &organizeUpdate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": result})
}

func (s *Service) Delete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	if err := s.OrganizeRepository.Delete(uint(id)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "success"})
}

func (s *Service) ApplyOrganize(c *gin.Context) {
	var newUserOrganize UserOrganizeCreate
	if err := c.BindJSON(&newUserOrganize); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
	}
	result, err := s.OrganizeRepository.ApplyOrganize(&newUserOrganize)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": result})
}

func (s *Service) EndOrganize(c *gin.Context) {
	var endOrganizeModel EndOrganizeModel
	if err := c.BindJSON(&endOrganizeModel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
	}
	id, err := uuid.NewUUID()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": string(err.Error())})
		return
	}
	organize, err := s.OrganizeRepository.Get(endOrganizeModel.OrganizeId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": string(err.Error())})
		return
	}
	message := messaging.MessageEvent{
		Id:   id,
		Data: organize,
	}
	messaging.Publish(message)
	c.JSON(http.StatusOK, gin.H{"data": "success"})
}
