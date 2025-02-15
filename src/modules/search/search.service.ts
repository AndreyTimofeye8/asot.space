import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from '../../entities/episode.entity';
import { Track } from '../../entities/track.entity';
import { Repository } from 'typeorm';
import { Label } from '../../entities/label.entity';
import { Artist } from '../../entities/artist.entity';

@Injectable()
export class SearchService implements OnModuleInit {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async onModuleInit() {
    await this.setupIndices();
    await this.indexAllData();
  }

  async setupIndices() {
    await this.elasticsearchService.indices.delete(
      { index: 'episodes' },
      { ignore: [404] },
    );

    await this.elasticsearchService.indices.delete(
      { index: 'tracks' },
      { ignore: [404] },
    );

    await this.elasticsearchService.indices.delete(
      { index: 'labels' },
      { ignore: [404] },
    );

    await this.elasticsearchService.indices.delete(
      { index: 'artists' },
      { ignore: [404] },
    );

    await this.elasticsearchService.indices.create({
      index: 'episodes',
      body: {
        mappings: {
          properties: {
            episode: {
              type: 'text',
            },
          },
        },
      },
    });

    await this.elasticsearchService.indices.create({
      index: 'tracks',
      body: {
        mappings: {
          properties: {
            title: {
              type: 'text', // Используем text для анализа текста
              fields: {
                keyword: {
                  type: 'keyword', // Используем keyword для точного совпадения
                },
              },
            },
          },
        },
      },
    });

    await this.elasticsearchService.indices.create({
      index: 'labels',
      body: {
        mappings: {
          properties: {
            name: {
              type: 'text', // Используем text для анализа текста
              fields: {
                keyword: {
                  type: 'keyword', // Используем keyword для точного совпадения
                },
              },
            },
          },
        },
      },
    });

    await this.elasticsearchService.indices.create({
      index: 'artists',
      body: {
        mappings: {
          properties: {
            name: {
              type: 'text', // Используем text для анализа текста
              fields: {
                keyword: {
                  type: 'keyword', // Используем keyword для точного совпадения
                },
              },
            },
          },
        },
      },
    });
  }

  async indexAllData() {
    const episodes = await this.episodeRepository.find();
    console.log('Indexing episodes:', episodes.length);

    for (const episode of episodes) {
      await this.elasticsearchService.index({
        index: 'episodes',
        id: episode.id,
        document: episode,
      });
    }

    const tracks = await this.trackRepository.find();
    console.log('Indexing tracks:', tracks.length);

    for (const track of tracks) {
      await this.elasticsearchService.index({
        index: 'tracks',
        id: track.id,
        document: track,
      });
    }

    const labels = await this.labelRepository.find();
    console.log('Indexing labels:', labels.length);

    for (const label of labels) {
      await this.elasticsearchService.index({
        index: 'labels',
        id: label.id.toString(),
        document: label,
      });
    }

    const artists = await this.artistRepository.find();
    console.log('Indexing artists:', artists.length);

    for (const artist of artists) {
      await this.elasticsearchService.index({
        index: 'artists',
        id: artist.id.toString(),
        document: artist,
      });
    }
  }

  async searchAll(queryString: string) {
    // Разделяем запрос на слова и убираем лишние пробелы
    const queryWords = queryString
      .split(/\s+/) // Разделяем по пробелам
      .map((word) => word.trim().toLowerCase()) // Убираем пробелы и переводим в нижний регистр
      .filter((word) => word.length > 0); // Убираем пустые слова

    const { hits } = await this.elasticsearchService.search({
      index: ['episodes', 'tracks', 'labels', 'artists'],
      body: {
        query: {
          bool: {
            should: [
              {
                bool: {
                  filter: [
                    { term: { _index: 'episodes' } },
                    { match: { episode: queryString } },
                  ],
                },
              },
              {
                bool: {
                  filter: [
                    { term: { _index: 'tracks' } },
                    {
                      bool: {
                        should: [
                          {
                            bool: {
                              should: queryWords.map((word) => ({
                                match: { title: word },
                              })),
                            },
                          },
                        ],
                        minimum_should_match: 1,
                      },
                    },
                  ],
                },
              },
              {
                bool: {
                  filter: [
                    { term: { _index: 'labels' } },
                    {
                      bool: {
                        should: queryWords.map((word) => ({
                          match: { name: word }, // Поиск по полю `name` в `labels`
                        })),
                        minimum_should_match: 1,
                      },
                    },
                  ],
                },
              },
              {
                bool: {
                  filter: [
                    { term: { _index: 'artists' } },
                    {
                      bool: {
                        should: queryWords.map((word) => ({
                          match: { name: word }, // Поиск по полю `name` в `artists`
                        })),
                        minimum_should_match: 1,
                      },
                    },
                  ],
                },
              },
            ],
            minimum_should_match: 1,
          },
        },
        size: 20,
      },
    });

    const episodes = hits.hits
      .filter((hit) => hit._index === 'episodes')
      .map((hit) => hit._source);

    const tracks = hits.hits
      .filter((hit) => hit._index === 'tracks')
      .map((hit) => hit._source);

    const labels = hits.hits
      .filter((hit) => hit._index === 'labels')
      .map((hit) => hit._source);

    const artists = hits.hits
      .filter((hit) => hit._index === 'artists')
      .map((hit) => hit._source);

    return {
      episodes,
      tracks,
      labels,
      artists,
    };
  }
}
