import { IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString({ each: true })
  categories: string[];
}
