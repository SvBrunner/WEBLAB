import { Ring, RING_VALUES } from '../entities/ring';
import { Category, CATEGORY_VALUES } from '../entities/category';
import { IsString, IsNotEmpty, MaxLength, IsIn } from 'class-validator';
import { Technology } from '../entities/technology.entity';

export class CreateTechnologyDraftDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(50)
  name: string;

  @IsString()
  description: string;

  @IsIn([...RING_VALUES, null], { message: 'Ring must be a valid enum value' })
  ring: Ring | null;

  @IsIn(CATEGORY_VALUES, { message: 'Category must be a valid enum value' })
  @IsNotEmpty({ message: 'Category is required' })
  category: Category;

  public toEntity(): Technology {
    const tech = new Technology();
    tech.name = this.name;
    tech.description = this.description || '';
    tech.ring = this.ring;
    tech.category = this.category;
    tech.published = false;
    tech.publishedAt = null;
    return tech;
  }
}
