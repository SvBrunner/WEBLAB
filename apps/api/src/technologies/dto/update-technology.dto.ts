import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateTechnologyDto } from './create-technology.dto';

export class UpdateTechnologyDto extends CreateTechnologyDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
