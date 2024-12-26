import { Ctx, On, Wizard, WizardStep } from 'nestjs-telegraf';
import { Public } from '../../../common/decorator/public.decorator';
import { WizardContext } from 'telegraf/typings/scenes';
import { buttons, messages } from '../bot.constants';

@Wizard('launch')
export class BotLaunchService {
  constructor() {}

  @Public()
  @WizardStep(1)
  async stepOne(@Ctx() context: WizardContext) {
    const { message } = context;

    if (message) {
      if ('text' in message && message.text.slice(7)) {
        console.log('с параметром');
        console.log(message.text.slice(7));
      } else {
        await context.reply(messages.welcome, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: buttons.startUsing,
                  callback_data: JSON.stringify({
                    step: 'launch',
                    action: 'continue',
                  }),
                },
              ],
            ],
          },
        });
      }
      context.wizard.next();
    }
  }

  @Public()
  @WizardStep(2)
  @On('callback_query')
  async stepTwo(@Ctx() context: WizardContext) {
    const { callbackQuery } = context;

    if (!callbackQuery) {
      return;
    }

    if ('data' in callbackQuery) {
      const { data } = callbackQuery;
      const parsedData = JSON.parse(data);

      if (parsedData.action === 'continue') {
        await Promise.all([
          context.reply('Great! Enjoy using the bot 😊 \nasot.space'),
          context.deleteMessage(),
          context.scene.leave(),
        ]);
      }
    }
  }
}
