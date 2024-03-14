import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dtos/create-post.dto';
import { ErrorMessages } from 'src/constants';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private postModel: Model<Post>) { }

  async findAll() {
    return await this.postModel.find().populate('categories');
  }

  async findOne(id) {
    try {
      const post = await this.postModel.findById(id);
      if (!post) {
        throw new HttpException(
          `Post with id: ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return post;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createPostDto: CreatePostDTO) {
    try {
      const post = new this.postModel({
        ...createPostDto,
        slug: createPostDto.title.toLowerCase().split(' ').join('-'),
      });
      return await post.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          ErrorMessages.duplicated_post,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: CreatePostDTO) {
    const post = await this.findOne(id);
    return await post.updateOne(data).populate('categories');
  }

  async remove(id: string) {
    const post = await this.findOne(id);
    return await post.deleteOne();
  }
}
