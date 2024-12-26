import { Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import { Public } from '../../../common/decorator/public.decorator';
import { WizardContext } from 'telegraf/typings/scenes';
import { messages } from '../bot.constants';
import { EpisodesService } from 'src/modules/episodes/episodes.service';
import { NotFoundException } from '@nestjs/common';
import { Episode } from 'src/entities/episode.entity';
import { ConfigService } from '@nestjs/config';

@Wizard('search')
export class BotSearchService {
  constructor(
    private readonly episodeService: EpisodesService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @WizardStep(1)
  async stepOne(@Ctx() context: WizardContext) {
    const { message } = context;

    if (message) {
      await context.reply(messages.findEpisode);
    }

    context.wizard.next();
  }

  @Public()
  @WizardStep(2)
  async stepTwo(@Ctx() context: WizardContext) {
    const { message } = context;

    if (!message) {
      return;
    }

    if (!('text' in message)) {
      await context.reply(messages.useTextOnly);
      return;
    }

    if (message && 'text' in message) {
      const { text } = message;

      try {
        const episode = await this.episodeService.findOneById(text);

        if (episode) {
          const formattedEpisode = this.getFormattedEpisodeData(episode);
          console.log(episode);

          await context.telegram.sendPhoto(
            context.chat.id,
            `${this.configService.get('HOST_URL')}/${episode.imageUrl}`,
            { caption: formattedEpisode, parse_mode: 'HTML' },
          );

          if (episode.youtube)
            await context.reply(
              `<a href="${episode.youtube}">Watch stream</a>`,
              {
                parse_mode: 'HTML',
              },
            );
        }
      } catch (error) {
        if (error instanceof NotFoundException) {
          await context.reply(
            messages.episodeNotFound.replace('{text}', `"${text}"`),
          );
        }
      }
      await context.scene.leave();
    }
  }

  private getFormattedEpisodeData(episode: Episode) {
    const formattedDate = new Date(episode.date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const tracklist = episode.tracks.map((track) => {
      const artists = track.artists.map((artist) => {
        return artist.name;
      });

      return `${track.number}.${track['award'] ? ` ${track['award'].name}:` : ''} ${artists.join(', ')} - ${track.title}${track.label ? ` [${track.label.name}]` : ''}`;
    });

    const stringifyEpisode = `<b>ASOT ${episode.episode}</b>\n\n${formattedDate}\n\n<b>Tracklist</b>:\n${tracklist.join('\n')}\n\n<a href="${episode.youtube}">YouTube</a>`;

    return stringifyEpisode;
  }
}
