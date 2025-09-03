import { Ring } from './ring';
import { Category } from './category';

export class Technology {
  uuid: string;
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
    this.uuid = uuid;
    this.name = name;
    this.description = description;
    this.ring = ring;
    this.category = category;
  }
}
