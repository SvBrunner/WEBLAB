import { Ring, RING_VALUES } from '../entities/ring';
import { Category, CATEGORY_VALUES } from '../entities/category';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsBoolean,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsIn(RING_VALUES, { message: 'Ring must be a valid enum value' })
  @IsNotEmpty({ message: 'Ring is required' })
  ring: Ring;

  @IsIn(CATEGORY_VALUES, { message: 'Category must be a valid enum value' })
  @IsNotEmpty({ message: 'Category is required' })
  category: Category;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
