import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesService } from '../episodes.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Episode } from '../../../entities/episode.entity';
import { CacheService } from '../../../modules/cache/cache.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  existingEpisode,
  fullMockEpisodes,
  mockEpisodeId,
  mockEpisodeNumber,
  mockEpisodeWithTracklist,
  shortMockEpisode,
  updatedMockEpisode,
  updateEpisodeDto,
} from './episodes.mocks';
import { Track } from '../../../entities/track.entity';
import { TrackEpisode } from '../../../entities/track-episode.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { episodeExceptionMessages } from '../episode.constants';

describe('EpisodeService', () => {
  let service: EpisodesService;
  let episodeRepository: Repository<Episode>;
  let cacheService: CacheService;
  let trackRepository: Repository<Track>;
  let trackEpisodeRepository: Repository<TrackEpisode>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodesService,
        {
          provide: getRepositoryToken(Episode),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Track),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TrackEpisode),
          useClass: Repository,
        },
        {
          provide: CacheService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            delKeysWithPrefix: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EpisodesService>(EpisodesService);
    episodeRepository = module.get<Repository<Episode>>(
      getRepositoryToken(Episode),
    );
    trackRepository = module.get<Repository<Track>>(getRepositoryToken(Track));
    trackEpisodeRepository = module.get<Repository<TrackEpisode>>(
      getRepositoryToken(TrackEpisode),
    );
    cacheService = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw an exception if the episode already exists', async () => {
      jest
        .spyOn(episodeRepository, 'find')
        .mockResolvedValue([existingEpisode]);

      await expect(service.create([shortMockEpisode])).rejects.toThrow(
        new BadRequestException('Episode already exists'),
      );
    });
  });

  describe('findAll', () => {
    it('should return data from cache if exists', async () => {
      const cachedData = fullMockEpisodes;
      const findAndCountMock = jest
        .spyOn(episodeRepository, 'findAndCount')
        .mockResolvedValue([
          fullMockEpisodes.episodes,
          fullMockEpisodes.totalItems,
        ]);

      jest.spyOn(cacheService, 'get').mockResolvedValue(cachedData);

      const result = await service.findAll({ page: 1, limit: 20 }, 2024);

      expect(cacheService.get).toHaveBeenCalledWith('episodes:1:20:2024');
      expect(result).toBe(cachedData);
      expect(findAndCountMock).not.toHaveBeenCalled();
    });
  });

  describe('findOneById', () => {
    it('should return episode by number id', async () => {
      jest
        .spyOn(service, 'findOneById')
        .mockResolvedValue(mockEpisodeWithTracklist);

      const result = await service.findOneById(mockEpisodeNumber);

      expect(result).toEqual(mockEpisodeWithTracklist);
    });
  });

  describe('update', () => {
    it('should update episode', async () => {
      const mockUpdateResult: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest
        .spyOn(episodeRepository, 'update')
        .mockResolvedValue(mockUpdateResult);
      jest
        .spyOn(episodeRepository, 'findOne')
        .mockResolvedValue(updatedMockEpisode);
      jest.spyOn(cacheService, 'delKeysWithPrefix').mockResolvedValue();

      const result = await service.update(mockEpisodeId, updateEpisodeDto);

      expect(result).toEqual(updatedMockEpisode);
      expect(episodeRepository.update).toHaveBeenCalledWith(
        { id: mockEpisodeId },
        updateEpisodeDto,
      );
      expect(cacheService.delKeysWithPrefix).toHaveBeenCalledWith('episodes');
    });
  });

  describe('remove', () => {
    it('should successfully remove an episode', async () => {
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: [],
      };

      jest
        .spyOn(episodeRepository, 'delete')
        .mockResolvedValue(mockDeleteResult);
      jest
        .spyOn(cacheService, 'delKeysWithPrefix')
        .mockResolvedValue(undefined);

      const result = await service.remove(mockEpisodeId);

      expect(result).toEqual({ success: true });
      expect(episodeRepository.delete).toHaveBeenCalledWith(mockEpisodeId);
      expect(cacheService.delKeysWithPrefix).toHaveBeenCalledWith('episodes');
    });

    it('should throw exception if episode does not exist', async () => {
      const mockDeleteResult: DeleteResult = {
        affected: 0,
        raw: [],
      };

      jest
        .spyOn(episodeRepository, 'delete')
        .mockResolvedValue(mockDeleteResult);

      await expect(service.remove(mockEpisodeId)).rejects.toThrow(
        new NotFoundException(episodeExceptionMessages.episodeNotFound),
      );

      expect(episodeRepository.delete).toHaveBeenCalledWith(mockEpisodeId);
      expect(cacheService.delKeysWithPrefix).not.toHaveBeenCalled();
    });
  });
});
