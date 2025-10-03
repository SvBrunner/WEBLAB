import {Category, Ring} from './technology.type';

export interface UpdateTechnologyDto {
  name: string;
  description?: string;
  category: Category;
  ring?: Ring | null;
}
