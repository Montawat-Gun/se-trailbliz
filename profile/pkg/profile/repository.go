package profile

import (
	"trailbliz/profile/pkg/database"
	"trailbliz/profile/pkg/database/model"

	"gorm.io/gorm"
)

type SqlRepository struct {
	Db *gorm.DB
}

type ProfileRepository interface {
	GetAll() ([]model.Profile, error)
	Get(id uint) (model.Profile, error)
	Create(Profile *model.Profile) (model.Profile, error)
	Update(id uint, ProfileUpdate *model.ProfileUpdate) (model.Profile, error)
	Delete(id uint) error
	AddReward(newReward model.Reward) (model.Reward, error)
}

func NewRepository() *SqlRepository {
	return &SqlRepository{
		Db: database.DB,
	}
}

func (r *SqlRepository) GetAll() ([]model.Profile, error) {
	var profiles []model.Profile
	result := r.Db.Find(&profiles)
	return profiles, result.Error
}

func (r *SqlRepository) Get(id uint) (model.Profile, error) {
	var profile model.Profile
	result := r.Db.Where("id = ?", id).Preload("Rewards").First(&profile)
	return profile, result.Error
}

func (r *SqlRepository) Create(profile *model.Profile) (model.Profile, error) {
	result := r.Db.Create(&profile)
	return *profile, result.Error
}

func (r *SqlRepository) Update(id uint, profileUpdate *model.ProfileUpdate) (model.Profile, error) {
	var profile model.Profile
	if err := r.Db.Where("id = ?", id).First(&profile).Error; err != nil {
		return profile, err
	}
	if err := r.Db.Model(&profile).Updates(&profileUpdate).Error; err != nil {
		return profile, err
	}
	return profile, nil
}

func (r *SqlRepository) Delete(id uint) error {
	var profile model.Profile
	if err := r.Db.Where("id = ?", id).First(&profile).Error; err != nil {
		return err
	}
	err := r.Db.Delete(&profile).Error
	return err
}

func (r *SqlRepository) AddReward(newReward model.Reward) (model.Reward, error) {
	result := r.Db.Create(&newReward)
	return newReward, result.Error
}
