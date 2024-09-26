const { Telegraf } = require('telegraf');

const BOT_TOKEN = '7205848165:AAFueVRtFLGHtTExyoPpHV5b44IoSszOiPg'; // Seu token do bot

const bot = new Telegraf(BOT_TOKEN);

// Lista de IDs dos usuários que iniciaram o bot
const users = [];

bot.start((ctx) => {
  ctx.reply('Olá! 👋');
  users.push(ctx.from.id);
  console.log(`Novo usuário: ${ctx.from.id}`);
});

// Comando para enviar mensagens para todos os usuários
bot.command('enviar', async (ctx) => {
  const mensagem = ctx.message.text.split(' ')[1];
  const replyMarkup = {}; 

  // Verifica se a mensagem é um link, um vídeo ou um arquivo
  if (mensagem.startsWith('http') || mensagem.startsWith('https')) {
    replyMarkup.disable_web_page_preview = true; // Desativa a pré-visualização de links
  } else if (mensagem.endsWith('.mp4') || mensagem.endsWith('.mkv') || mensagem.endsWith('.avi')) {
    replyMarkup.disable_web_page_preview = true; // Desativa a pré-visualização para vídeos
  } else {
    replyMarkup.disable_web_page_preview = false;
  }

  if (!mensagem) {
    ctx.reply('Por favor, digite a mensagem, o link, o vídeo ou o arquivo que deseja enviar.');
    return;
  }

  for (const userId of users) {
    try {
      await bot.telegram.sendMessage(userId, mensagem, replyMarkup);
      console.log(`Mensagem enviada para ${userId}`);
    } catch (error) {
      console.error(`Erro ao enviar mensagem para ${userId}:`, error);
    }
  }

  ctx.reply('Mensagem enviada para todos os usuários!');
});

bot.launch();
