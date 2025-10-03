import {Category, Ring} from "./technology.type";

export interface CreateDraftTechnologyDto {
  name: string;
  description?: string;
  category: Category;
  ring?: Ring | null;
}
