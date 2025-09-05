import { Ring } from '../entities/ring';
import { Category } from '../entities/category';

export class ReadTechnologyDto {
  id: string;
  name: string;
  description: string;
  ring: Ring;
  category: Category;

  constructor(
    uuid: string,
    name: string,
    description: string,
    ring: Ring,
    category: Category,
  ) {
    this.id = uuid;
    this.name = name;
    this.description = description;
    this.ring = ring;
    this.category = category;
  }
}
