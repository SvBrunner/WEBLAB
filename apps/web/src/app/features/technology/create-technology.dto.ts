import {Category, Ring} from './technology.type';

export interface CreateTechnologyDto {
  name: string;
  description: string;
  category: Category;
  ring: Ring;
}
