import { Command, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { botCommands, commandScenes } from '../bot.constants';
import { Public } from '../../../common/decorator/public.decorator';

@Update()
export class BotService {
  constructor(
    @InjectBot()
    private bot: Telegraf<SceneContext>,
  ) {
    this.setupCommands();
  }

  private setupCommands() {
    this.bot.telegram.setMyCommands(botCommands);
  }

  @Public()
  @Start()
  async startCommand(ctx: SceneContext) {
    await ctx.scene.enter('launch');
  }

  @Public()
  @Command(Object.keys(commandScenes))
  async handleCommand(context: SceneContext) {
    const { message } = context;

    if (message && 'text' in message) {
      const command = message.text?.substring(1);
      const scene = commandScenes[command];

      if (scene) {
        await context.scene.enter(scene);
      }
    }
  }
}
