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
import { Technology } from '../entities/technology.entity';

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

  public toEntity(): Technology {
    const tech = new Technology();
    tech.name = this.name;
    tech.description = this.description;
    tech.ring = this.ring;
    tech.category = this.category;
    tech.published = true;
    tech.publishedAt = new Date();
    return tech;
  }
}
