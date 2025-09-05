import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { ReadTechnologyDto } from './dto/read-technology.dto';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { Technology } from './entities/technology.entity';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { Public } from '../auth/public.decorator';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Public()
  @Get()
  async getAllTechnologies(): Promise<ReadTechnologyDto[]> {
    const entities = await this.technologiesService.getTechnologies();
    return entities.map<ReadTechnologyDto>((el) => this.entityToDto(el));
  }

  @Get(':uuid')
  async getTechnology(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<ReadTechnologyDto> {
    const entity = await this.technologiesService.getTechnologyByUuid(uuid);
    if (entity === null) {
      throw new NotFoundException(`Technology with uuid ${uuid} not found`);
    } else {
      return this.entityToDto(entity);
    }
  }

  @Delete(':uuid')
  async deleteTechnology(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<void> {
    const res = await this.technologiesService.deleteTechnology(uuid);
    if (res.affected == null || res.affected == 0) {
      throw new NotFoundException();
    }
  }

  @Post()
  async createTechnology(
    @Body() createTechDto: CreateTechnologyDto,
  ): Promise<void> {
    await this.technologiesService.createTechnology(
      this.createDtoToEntity(createTechDto),
    );
  }

  @Put()
  async updateTechnology(
    @Body() updateTechDto: UpdateTechnologyDto,
  ): Promise<void> {
    await this.technologiesService.updateTechnology(
      this.updateDtoToEntity(updateTechDto),
    );
  }

  private entityToDto(entity: Technology) {
    return new ReadTechnologyDto(
      entity.id,
      entity.name,
      entity.description,
      entity.ring,
      entity.category,
    );
  }

  private createDtoToEntity(dto: CreateTechnologyDto): Technology {
    const entity = new Technology();
    entity.name = dto.name;
    entity.description = dto.description;
    entity.ring = dto.ring;
    entity.category = dto.category;
    entity.published = dto.published ?? false;
    return entity;
  }

  private updateDtoToEntity(dto: UpdateTechnologyDto): Technology {
    const entity = this.createDtoToEntity(dto);
    entity.id = dto.id;
    return entity;
  }
}
