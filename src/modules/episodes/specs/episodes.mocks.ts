import { Episode } from 'src/entities/episode.entity';
import {
  EpisodeOkResponse,
  ShortEpisodeResponse,
} from '../dto/episode.responses';
import { UpdateEpisodeDto } from '../dto/update-episode.dto';

export const shortMockEpisode: ShortEpisodeResponse = {
  id: '5a971f57-ea0b-4a28-a5d9-cc7ed96f3589',
  episode: '1206',
  date: new Date('2024-12-26'),
  youtube: 'https://www.youtube.com/watch?v=2Gy0IyzaNqA',
  imageUrl: 'static/covers/episodes/1205.jpg',
  audioFiles: [],
  ratings: [],
  comments: [],
  users: [],
};

export const existingEpisode: Episode = {
  ...shortMockEpisode,
  tracks: [],
  audioFiles: [],
  comments: [],
  ratings: [],
  users: [],
};

export const fullMockEpisode: Episode = {
  ...shortMockEpisode,
  tracks: [],
  audioFiles: [],
  ratings: [],
  comments: [],
  users: [],
};

export const fullMockEpisodes = {
  episodes: [fullMockEpisode],
  totalPages: 1,
  currentPage: 1,
  totalItems: 10,
};

export const mockEpisodeNumber = '2222';
export const mockEpisodeId = 'id';

export const mockEpisodeWithTracklist: EpisodeOkResponse = {
  id: 'episode id',
  episode: mockEpisodeNumber,
  date: new Date('2024-12-26'),
  youtube: 'https://www.youtube.com/watch?v=2Gy0IyzaNqA',
  imageUrl: 'static/covers/episodes/1205.jpg',
  tracks: [
    {
      id: '1',
      title: 'Track 1',
      number: 1,
      award: { name: 'Best Track' },
      labelId: '1',
      label: { id: 1, name: 'Label', tracks: [] },
      episodes: [],
      artists: [],
    },
  ],
  audioFiles: [],
  ratings: [],
  comments: [],
  users: [],
};

export const updateEpisodeDto: UpdateEpisodeDto = {
  episode: '5678',
};

export const updatedMockEpisode = {
  ...existingEpisode,
  ...updateEpisodeDto,
  episode: '5678',
};
