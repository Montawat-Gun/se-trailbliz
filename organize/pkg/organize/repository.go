package organize

import (
	"trailbliz/organize/pkg/database"
	"trailbliz/organize/pkg/database/model"

	"gorm.io/gorm"
)

type SqlRepository struct {
	Db *gorm.DB
}

type OrganizeRepository interface {
	GetAll() ([]model.Organize, error)
	Get(id uint) (model.Organize, error)
	Create(organize *model.Organize) (model.Organize, error)
	Update(id uint, organizeUpdate *OrganizeUpdate) (model.Organize, error)
	Delete(id uint) error

	ApplyOrganize(userOrganize *UserOrganizeCreate) (UserOrganizeCreate, error)
	EndOrganize() error
}

func NewRepository() *SqlRepository {
	return &SqlRepository{
		Db: database.DB,
	}
}

func (r *SqlRepository) GetAll() ([]model.Organize, error) {
	var organizes []model.Organize
	result := r.Db.Find(&organizes)
	return organizes, result.Error
}

func (r *SqlRepository) Get(id uint) (model.Organize, error) {
	var organize model.Organize
	result := r.Db.Where("id = ?", id).Preload("UsersOrganize").First(&organize)
	return organize, result.Error
}

func (r *SqlRepository) Create(organize *model.Organize) (model.Organize, error) {
	result := r.Db.Create(&organize)
	return *organize, result.Error
}

func (r *SqlRepository) Update(id uint, organizeUpdate *OrganizeUpdate) (model.Organize, error) {
	var organize model.Organize
	if err := r.Db.Where("id = ?", id).First(&organize).Error; err != nil {
		return organize, err
	}
	if err := r.Db.Model(&organize).Updates(&organizeUpdate).Error; err != nil {
		return organize, err
	}
	return organize, nil
}

func (r *SqlRepository) Delete(id uint) error {
	var organize model.Organize
	if err := r.Db.Where("id = ?", id).First(&organize).Error; err != nil {
		return err
	}
	err := r.Db.Delete(&organize).Error
	return err
}

func (r *SqlRepository) ApplyOrganize(userOrganizeCreate *UserOrganizeCreate) (UserOrganizeCreate, error) {
	var organize model.Organize
	if result := r.Db.Where("id = ?", userOrganizeCreate.OrganizeId).First(&organize); result.Error != nil {
		return *userOrganizeCreate, result.Error
	}
	var userOrganize = model.UserOrganize{
		UserId:     userOrganizeCreate.UserId,
		UserName:   userOrganizeCreate.UserName,
		UserType:   userOrganizeCreate.UserType,
		OrganizeId: userOrganizeCreate.OrganizeId,
	}
	if result := r.Db.Create(&userOrganize); result.Error != nil {
		return *userOrganizeCreate, result.Error
	}
	return *userOrganizeCreate, nil
}

func (r *SqlRepository) EndOrganize() error {
	return nil
}
