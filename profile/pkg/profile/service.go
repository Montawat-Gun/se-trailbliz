package profile

import (
	"net/http"
	"strconv"
	"trailbliz/profile/pkg/database/model"

	"github.com/gin-gonic/gin"
)

type Service struct {
	ProfileRepository
}

type ProfileService interface {
	GetAll(c *gin.Context)
	Get(c *gin.Context)
	Create(c *gin.Context)
	Update(c *gin.Context)
	Delete(c *gin.Context)
}

func (s *Service) GetAll(c *gin.Context) {
	result, err := s.ProfileRepository.GetAll()
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
	result, err := s.ProfileRepository.Get(uint(id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": result})
}

func (s *Service) Create(c *gin.Context) {
	var newProfile model.Profile
	c.BindJSON(&newProfile)
	result, err := s.ProfileRepository.Create(&newProfile)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": result})
}

func (s *Service) Update(c *gin.Context) {
	var profileUpdate model.ProfileUpdate
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	if err := c.ShouldBindJSON(&profileUpdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	result, err := s.ProfileRepository.Update(uint(id), &profileUpdate)
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
	if err := s.ProfileRepository.Delete(uint(id)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": string(err.Error())})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "success"})
}
