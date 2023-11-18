import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OrganizeService } from './organize.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('organize')
export class OrganizeController {
  constructor(private readonly organizeService: OrganizeService) {}

  @Get()
  async getAll() {
    try {
      return await this.organizeService.getAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      return await this.organizeService.get(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() organizeDto: any) {
      try {
      return await this.organizeService.create(organizeDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() organizeDto: any) {
    try {
      return await this.organizeService.update(id, organizeDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.organizeService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('applyOrganize')
  async applyOrganize(@Body() body: any) {
    try {
      return await this.organizeService.applyOrganize(body);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('endOrganize')
  async endOrganize(@Body() body: any) {
    try {
      return await this.organizeService.endOrganize(body);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
