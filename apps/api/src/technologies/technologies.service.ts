import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from './entities/technology.entity';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { CreateTechnologyDraftDto } from './dto/create-technology-draft.dto';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private readonly techRepository: Repository<Technology>,
  ) {}

  private async findByIdOrThrow(id: string): Promise<Technology> {
    const tech = await this.techRepository.findOne({ where: { id } });
    if (!tech) throw new NotFoundException(`Technology ${id} not found`);
    return tech;
  }

  async getTechnologies(): Promise<Technology[]> {
    return this.techRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getTechnologyByUuid(id: string): Promise<Technology> {
    return this.findByIdOrThrow(id);
  }

  async createTechnology(dto: CreateTechnologyDto): Promise<Technology> {
    const entity = dto.toEntity();
    return this.techRepository.save(entity);
  }

  async createDraft(dto: CreateTechnologyDraftDto): Promise<Technology> {
    const entity = this.techRepository.create(dto.toEntity());
    return this.techRepository.save(entity);
  }

  async updateTechnology(dto: UpdateTechnologyDto): Promise<Technology> {
    const entity = await this.techRepository.preload(dto.toEntity());
    if (!entity) throw new NotFoundException(`Technology ${dto.id} not found`);
    return this.techRepository.save(entity);
  }

  async deleteTechnology(id: string): Promise<void> {
    const result = await this.techRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Technology ${id} not found`);
    }
  }

  async publishTechnology(id: string): Promise<void> {
    const ready = await this.isTechReadyForPublish(id);
    if (!ready) {
      throw new BadRequestException('Technology is not ready to publish');
    }

    const result = await this.techRepository.update(
      { id, published: false },
      { published: true, publishedAt: new Date() },
    );

    if (result.affected === 0) {
      const exists = await this.techRepository.exists({ where: { id } });
      if (!exists) throw new NotFoundException(`Technology ${id} not found`);
      throw new BadRequestException('Technology already published');
    }
  }

  async isTechReadyForPublish(id: string): Promise<boolean> {
    const tech = await this.techRepository.findOne({
      select: ['id', 'name', 'description', 'category', 'ring', 'published'],
      where: { id },
    });
    if (!tech) throw new NotFoundException(`Technology ${id} not found`);
    const hasRequired =
      !!tech.name && !!tech.description && !!tech.category && !!tech.ring;
    return hasRequired && !tech.published;
  }
}
