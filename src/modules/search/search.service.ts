import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from 'src/entities/episode.entity';
import { Track } from 'src/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService implements OnModuleInit {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
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
            artist: {
              type: 'text', // Используем text для анализа текста
              fields: {
                keyword: {
                  type: 'keyword', // Используем keyword для точного совпадения
                },
              },
            },
            title: {
              type: 'text', // Используем text для анализа текста
              fields: {
                keyword: {
                  type: 'keyword', // Используем keyword для точного совпадения
                },
              },
            },
            label: {
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
  }

  async searchAll(queryString: string) {
    // Разделяем запрос на слова и убираем лишние пробелы
    const queryWords = queryString
      .split(/\s+/) // Разделяем по пробелам
      .map((word) => word.trim().toLowerCase()) // Убираем пробелы и переводим в нижний регистр
      .filter((word) => word.length > 0); // Убираем пустые слова

    console.log(queryWords);

    const { hits } = await this.elasticsearchService.search({
      index: ['episodes', 'tracks'],
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
                                match: { artist: word },
                              })),
                            },
                          },
                          {
                            bool: {
                              should: queryWords.map((word) => ({
                                match: { title: word },
                              })),
                            },
                          },
                          {
                            bool: {
                              should: queryWords.map((word) => ({
                                match: { label: word },
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
            ],
            minimum_should_match: 1,
          },
        },
        size: 20,
      },
    });

    console.log('Search Results:', hits);

    const episodes = hits.hits
      .filter((hit) => hit._index === 'episodes')
      .map((hit) => hit._source);

    const tracks = hits.hits
      .filter((hit) => hit._index === 'tracks')
      .map((hit) => hit._source);

    return {
      episodes,
      tracks,
    };
  }
}
