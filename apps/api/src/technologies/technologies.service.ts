import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Technology } from './entities/technology.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private techRepository: Repository<Technology>,
  ) {}

  getTechnologies(): Promise<Technology[]> {
    return this.techRepository.find();
  }

  deleteTechnology(id: string): Promise<DeleteResult> {
    return this.techRepository.delete({ id: id });
  }

  getTechnologyByUuid(id: string): Promise<Technology | null> {
    return this.techRepository.findOneBy({ id });
  }

  async createTechnology(tech: Technology): Promise<void> {
    await this.techRepository.insert(tech);
  }

  async updateTechnology(tech: Technology): Promise<void> {
    const entity = await this.techRepository.preload(tech);
    if (!entity) {
      throw new NotFoundException('Technology to update not found');
    }
    await this.techRepository.save(entity);
  }
}
