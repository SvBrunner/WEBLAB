import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { Technology } from './dto/technology';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Get()
  getAllTechnologies(): Technology[] {
    return this.technologiesService.getTechnologies();
  }

  @Get(':uuid')
  getTechnology(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Technology {
    return this.technologiesService.getTechnologyByUuid(uuid);
  }
}
