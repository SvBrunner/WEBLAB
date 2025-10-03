import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { TechnologiesService } from './technologies.service';
import { Technology } from './entities/technology.entity';

type MockRepo<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createRepoMock = (): MockRepo<Technology> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  preload: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  exists: jest.fn(),
});

describe('TechnologiesService', () => {
  let service: TechnologiesService;
  let repo: MockRepo<Technology>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnologiesService,
        {
          provide: getRepositoryToken(Technology),
          useValue: createRepoMock(),
        },
      ],
    }).compile();

    service = module.get<TechnologiesService>(TechnologiesService);
    repo = module.get(getRepositoryToken(Technology));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getTechnologies', () => {
    it('returns technologies ordered by createdAt DESC', async () => {
      const rows = [{ id: '1' }, { id: '2' }] as Technology[];
      (repo.find as jest.Mock).mockResolvedValue(rows);

      const result = await service.getTechnologies();

      expect(repo.find).toHaveBeenCalledWith({ order: { createdAt: 'DESC' } });
      expect(result).toBe(rows);
    });
  });

  describe('getTechnologyByUuid', () => {
    it('returns a technology', async () => {
      const tech = { id: 'abc' } as Technology;
      (repo.findOne as jest.Mock).mockResolvedValue(tech);

      await expect(service.getTechnologyByUuid('abc')).resolves.toBe(tech);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'abc' } });
    });

    it('throws NotFound when missing', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.getTechnologyByUuid('zzz')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('createTechnology', () => {
    it('saves entity from dto.toEntity()', async () => {
      const entity = { id: '1' } as Technology;
      const dto = { toEntity: jest.fn().mockReturnValue(entity) } as any;
      (repo.save as jest.Mock).mockResolvedValue(entity);

      const result = await service.createTechnology(dto);

      expect(dto.toEntity).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalledWith(entity);
      expect(result).toBe(entity);
    });
  });

  describe('createDraft', () => {
    it('uses repository.create + save', async () => {
      const partial = { name: 'Draft' } as any;
      const created = { id: 'd1', ...partial } as Technology;
      const dto = { toEntity: jest.fn().mockReturnValue(partial) } as any;
      (repo.create as jest.Mock).mockReturnValue(created);
      (repo.save as jest.Mock).mockResolvedValue(created);

      const result = await service.createDraft(dto);

      expect(repo.create).toHaveBeenCalledWith(partial);
      expect(repo.save).toHaveBeenCalledWith(created);
      expect(result).toBe(created);
    });
  });

  describe('updateTechnology', () => {
    it('preloads and saves', async () => {
      const preloaded = { id: 'u1', name: 'n' } as Technology;
      const dto = {
        toEntity: jest.fn().mockReturnValue({ id: 'u1', name: 'n' }),
        id: 'u1',
      } as any;
      (repo.preload as jest.Mock).mockResolvedValue(preloaded);
      (repo.save as jest.Mock).mockResolvedValue(preloaded);

      const result = await service.updateTechnology(dto);

      expect(repo.preload).toHaveBeenCalledWith({ id: 'u1', name: 'n' });
      expect(repo.save).toHaveBeenCalledWith(preloaded);
      expect(result).toBe(preloaded);
    });

    it('throws NotFound when preload returns null', async () => {
      const dto = {
        toEntity: jest.fn().mockReturnValue({ id: 'missing' }),
        id: 'missing',
      } as any;
      (repo.preload as jest.Mock).mockResolvedValue(null);

      await expect(service.updateTechnology(dto)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('deleteTechnology', () => {
    it('deletes by id', async () => {
      (repo.delete as jest.Mock).mockResolvedValue({
        affected: 1,
      } as DeleteResult);

      await expect(service.deleteTechnology('id1')).resolves.toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith({ id: 'id1' });
    });

    it('throws NotFound when nothing deleted', async () => {
      (repo.delete as jest.Mock).mockResolvedValue({
        affected: 0,
      } as DeleteResult);

      await expect(service.deleteTechnology('nope')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('isTechReadyForPublish', () => {
    it('returns true when required fields exist and not published', async () => {
      const tech = {
        id: 'r1',
        name: 'Name',
        description: 'Desc',
        category: 'Cat',
        ring: 'Adopt',
        published: false,
      } as Technology;

      (repo.findOne as jest.Mock).mockResolvedValue(tech);

      await expect(service.isTechReadyForPublish('r1')).resolves.toBe(true);
      expect(repo.findOne).toHaveBeenCalledWith({
        select: ['id', 'name', 'description', 'category', 'ring', 'published'],
        where: { id: 'r1' },
      });
    });

    it('returns false when missing fields or already published', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue({
        id: 'r2',
        name: 'Name',
        description: '',
        category: 'Cat',
        ring: 'Trial',
        published: false,
      } as Technology);

      await expect(service.isTechReadyForPublish('r2')).resolves.toBe(false);

      (repo.findOne as jest.Mock).mockResolvedValue({
        id: 'r3',
        name: 'Name',
        description: 'x',
        category: 'Cat',
        ring: 'Trial',
        published: true,
      } as Technology);

      await expect(service.isTechReadyForPublish('r3')).resolves.toBe(false);
    });

    it('throws NotFound when tech not found', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        service.isTechReadyForPublish('missing'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('publishTechnology', () => {
    it('publishes when ready', async () => {
      // Spy on readiness to isolate publish logic
      const readySpy = jest
        .spyOn(service, 'isTechReadyForPublish')
        .mockResolvedValue(true);

      (repo.update as jest.Mock).mockResolvedValue({
        affected: 1,
      } as UpdateResult);

      await expect(service.publishTechnology('pub1')).resolves.toBeUndefined();

      expect(readySpy).toHaveBeenCalledWith('pub1');
      expect(repo.update).toHaveBeenCalledWith(
        { id: 'pub1', published: false },
        expect.objectContaining({
          published: true,
          publishedAt: expect.any(Date),
        }),
      );
    });

    it('throws BadRequest when not ready', async () => {
      jest.spyOn(service, 'isTechReadyForPublish').mockResolvedValue(false);

      await expect(service.publishTechnology('x')).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(repo.update).not.toHaveBeenCalled();
    });

    it('throws NotFound when update affected=0 and entity does not exist', async () => {
      jest.spyOn(service, 'isTechReadyForPublish').mockResolvedValue(true);
      (repo.update as jest.Mock).mockResolvedValue({
        affected: 0,
      } as UpdateResult);
      (repo.exists as jest.Mock).mockResolvedValue(false);

      await expect(service.publishTechnology('nope')).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(repo.exists).toHaveBeenCalledWith({ where: { id: 'nope' } });
    });

    it('throws BadRequest when update affected=0 and entity exists (already published)', async () => {
      jest.spyOn(service, 'isTechReadyForPublish').mockResolvedValue(true);
      (repo.update as jest.Mock).mockResolvedValue({
        affected: 0,
      } as UpdateResult);
      (repo.exists as jest.Mock).mockResolvedValue(true);

      await expect(service.publishTechnology('already')).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });
});
