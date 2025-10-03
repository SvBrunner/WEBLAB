import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { ReadTechnologyDto } from './dto/read-technology.dto';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { CreateTechnologyDraftDto } from './dto/create-technology-draft.dto';
import { Technology } from './entities/technology.entity';
import { Public } from '../auth/public.decorator';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { PoliciesGuard } from '../casl/policies.guard';
import { AppAbility } from '../casl/casl-ability.factory';
import { Action } from '../auth/entities/action.enum';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Public()
  @Get()
  async getAllTechnologies(): Promise<ReadTechnologyDto[]> {
    const entities = await this.technologiesService.getTechnologies();
    return entities.map((e) => ReadTechnologyDto.fromEntity(e));
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Technology))
  @Get(':id')
  async getTechnology(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ReadTechnologyDto> {
    const entity = await this.technologiesService.getTechnologyByUuid(id);
    return ReadTechnologyDto.fromEntity(entity);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Delete, Technology),
  )
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTechnology(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.technologiesService.deleteTechnology(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, Technology),
  )
  @Post()
  async createTechnology(
    @Body() dto: CreateTechnologyDto,
  ): Promise<ReadTechnologyDto> {
    const entity = await this.technologiesService.createTechnology(dto);
    return ReadTechnologyDto.fromEntity(entity);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, Technology),
  )
  @Post('draft')
  async createDraftTechnology(
    @Body() dto: CreateTechnologyDraftDto,
  ): Promise<ReadTechnologyDto> {
    const entity = await this.technologiesService.createDraft(dto);
    return ReadTechnologyDto.fromEntity(entity);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, Technology),
  )
  @Put()
  async updateTechnology(
    @Body() dto: UpdateTechnologyDto,
  ): Promise<ReadTechnologyDto> {
    const entity = await this.technologiesService.updateTechnology(dto);
    return ReadTechnologyDto.fromEntity(entity);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, Technology),
  )
  @Patch(':id/publish')
  @HttpCode(HttpStatus.NO_CONTENT)
  async publishTechnology(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    // Let the service enforce readiness & existence (avoids race conditions)
    await this.technologiesService.publishTechnology(id);
  }
}
