import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesController } from './technologies.controller';
import { TechnologiesService } from './technologies.service';
import { PoliciesGuard } from '../casl/policies.guard';
import { ReadTechnologyDto } from './dto/read-technology.dto';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { CreateTechnologyDraftDto } from './dto/create-technology-draft.dto';
import { Technology } from './entities/technology.entity';

describe('TechnologiesController', () => {
  let controller: TechnologiesController;
  let service: jest.Mocked<TechnologiesService>;

  const serviceMock: jest.Mocked<TechnologiesService> = {
    getTechnologies: jest.fn(),
    getTechnologyByUuid: jest.fn(),
    createTechnology: jest.fn(),
    createDraft: jest.fn(),
    updateTechnology: jest.fn(),
    deleteTechnology: jest.fn(),
    publishTechnology: jest.fn(),
    isTechReadyForPublish: jest.fn(),
  } as any;

  const fromEntitySpy = jest.spyOn(ReadTechnologyDto, 'fromEntity');

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TechnologiesController],
      providers: [{ provide: TechnologiesService, useValue: serviceMock }],
    })
      .overrideGuard(PoliciesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = moduleRef.get<TechnologiesController>(TechnologiesController);
    service = moduleRef.get(
      TechnologiesService,
    ) as jest.Mocked<TechnologiesService>;
  });

  describe('getAllTechnologies', () => {
    it('maps entities to ReadTechnologyDto[]', async () => {
      const entities = [
        { id: '1', name: 'A' },
        { id: '2', name: 'B' },
      ] as unknown as Technology[];

      service.getTechnologies.mockResolvedValue(entities);

      fromEntitySpy
        .mockImplementationOnce((e: any) => ({ id: e.id, mapped: true }) as any)
        .mockImplementationOnce(
          (e: any) => ({ id: e.id, mapped: true }) as any,
        );

      const result = await controller.getAllTechnologies();

      expect(service.getTechnologies).toHaveBeenCalledTimes(1);
      expect(ReadTechnologyDto.fromEntity).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        { id: '1', mapped: true },
        { id: '2', mapped: true },
      ]);
    });
  });

  describe('getTechnology', () => {
    it('returns mapped dto for a single technology', async () => {
      const entity = { id: 'abc', name: 'Tech' } as unknown as Technology;
      service.getTechnologyByUuid.mockResolvedValue(entity);
      fromEntitySpy.mockReturnValue({ id: 'abc', mapped: true } as any);

      const result = await controller.getTechnology('abc');

      expect(service.getTechnologyByUuid).toHaveBeenCalledWith('abc');
      expect(ReadTechnologyDto.fromEntity).toHaveBeenCalledWith(entity);
      expect(result).toEqual({ id: 'abc', mapped: true });
    });
  });

  describe('createTechnology', () => {
    it('creates and returns ReadTechnologyDto', async () => {
      const dto = {} as CreateTechnologyDto;
      const created = { id: 'n1' } as unknown as Technology;
      service.createTechnology.mockResolvedValue(created);
      fromEntitySpy.mockReturnValue({ id: 'n1', mapped: true } as any);

      const result = await controller.createTechnology(dto);

      expect(service.createTechnology).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 'n1', mapped: true });
    });
  });

  describe('createDraftTechnology', () => {
    it('creates draft and returns ReadTechnologyDto', async () => {
      const dto = {} as CreateTechnologyDraftDto;
      const created = { id: 'd1' } as unknown as Technology;
      service.createDraft.mockResolvedValue(created);
      fromEntitySpy.mockReturnValue({ id: 'd1', mapped: true } as any);

      const result = await controller.createDraftTechnology(dto);

      expect(service.createDraft).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 'd1', mapped: true });
    });
  });

  describe('updateTechnology', () => {
    it('updates and returns ReadTechnologyDto', async () => {
      const dto = { id: 'u1' } as UpdateTechnologyDto;
      const updated = { id: 'u1', name: 'Updated' } as unknown as Technology;
      service.updateTechnology.mockResolvedValue(updated);
      fromEntitySpy.mockReturnValue({ id: 'u1', mapped: true } as any);

      const result = await controller.updateTechnology(dto);

      expect(service.updateTechnology).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 'u1', mapped: true });
    });
  });

  describe('deleteTechnology', () => {
    it('delegates to service and returns void', async () => {
      service.deleteTechnology.mockResolvedValue(undefined);

      await expect(
        controller.deleteTechnology('del1'),
      ).resolves.toBeUndefined();
      expect(service.deleteTechnology).toHaveBeenCalledWith('del1');
    });
  });

  describe('publishTechnology', () => {
    it('delegates to service and returns void', async () => {
      service.publishTechnology.mockResolvedValue(undefined);

      await expect(
        controller.publishTechnology('pub1'),
      ).resolves.toBeUndefined();
      expect(service.publishTechnology).toHaveBeenCalledWith('pub1');
    });
  });
});
