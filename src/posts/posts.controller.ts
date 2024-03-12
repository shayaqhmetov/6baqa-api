import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDTO) {
    return await this.postsService.create(createPostDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data) {
    return await this.postsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postsService.remove(id);
  }
}
