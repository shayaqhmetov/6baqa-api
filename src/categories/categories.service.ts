import { Model } from 'mongoose';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Category } from './interfaces/category.interface';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) { }

  protected categories: Category[] = [];

  async create(createCategoryDto: CreateCategoryDTO) {
    try {
      const createdCategory = new this.categoryModel(createCategoryDto);
      return await createdCategory.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          `Category with name: ${createCategoryDto.name} already exists.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new HttpException(
          `Category with id: ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateCategoryDto: CreateCategoryDTO) {
    const category = await this.findOne(id);
    return await category.updateOne(updateCategoryDto);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    return category.deleteOne();
  }
}
