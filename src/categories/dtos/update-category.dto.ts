import { IsString, IsBoolean } from 'class-validator';

export class UpdateCategoryDTO {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsBoolean()
  readonly isActive: boolean;
}
