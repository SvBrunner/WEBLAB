import { Ring } from '../entities/ring';
import { Category } from '../entities/category';
import { Technology } from '../entities/technology.entity';

export class ReadTechnologyDto {
  id: string;
  name: string;
  description: string | null;
  ring: Ring | null;
  category: Category;
  published: boolean;

  constructor(
    uuid: string,
    name: string,
    description: string | null,
    ring: Ring | null,
    category: Category,
    published: boolean,
  ) {
    this.id = uuid;
    this.name = name;
    this.description = description;
    this.ring = ring;
    this.category = category;
    this.published = published;
  }

  static fromEntity(entity: Technology): ReadTechnologyDto {
    return new ReadTechnologyDto(
      entity.id,
      entity.name,
      entity.description,
      entity.ring,
      entity.category,
      entity.published,
    );
  }
}
