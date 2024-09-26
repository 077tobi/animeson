const { Telegraf } = require('telegraf');
const axios = require('axios');
const cheerio = require('cheerio');

const BOT_TOKEN = process.env.BOT_TOKEN; // Variável de ambiente da Vercel
const URL_ANIMEFIRE = process.env.URL_ANIMEFIRE; // Variável de ambiente da Vercel

const bot = new Telegraf(BOT_TOKEN);

const getEpisodes = async () => {
  try {
    const response = await axios.get(URL_ANIMEFIRE);
    const $ = cheerio.load(response.data);
    const episodes = [];

    $('div.col-12.col-sm-6.col-md-4.col-lg-6.col-xl-3.divCardUltimosEpsHome').each((index, element) => {
      const link = $(element).find('a').attr('href');
      const capa = $(element).find('img.card-img-top.lazy.imgAnimesUltimosEps').attr('data-src');
      const título = $(element).find('h3.animeTitle').text();
      const episodio = $(element).find('span.numEp').text();

      episodes.push({
        link,
        capa,
        título,
        episodio,
      });
    });
    return episodes;
  } catch (error) {
    console.error('Erro ao obter episódios:', error); 
    return [];
  }
};

const sendNewEpisodes = async (episodes) => {
  const chatId = '-1001976226296'; // Substitua pelo ID do seu grupo do Telegram
  for (const episode of episodes) {
    const message = `Novo episódio disponível! 🎉\n\n` +
      `**${episode.título} - Episódio ${episode.episodio}**\n` +
      `[${episode.título}](${URL_ANIMEFIRE}${episode.link})\n` +
      `![Capa](${episode.capa})`;
    await bot.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  }
};

const checkForNewEpisodes = async () => {
  const newEpisodes = await getEpisodes();
  await sendNewEpisodes(newEpisodes); 
};

bot.start((ctx) => ctx.reply('Bem-vindo! 👋'));

bot.command('adicionar', async (ctx) => {
  const link = ctx.message.text.split(' ')[1]; 
  try {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);

    const título = $('h1.animeTitle').text();
    const episódio = $('span.numEp').text();
    const capa = $('img.img-fluid.lazy.imgAnimes').attr('data-src');

    const chatId = '-1001976226296'; 
    const message = `Novo episódio disponível! 🎉\n\n` +
      `**${título} - Episódio ${episódio}**\n` +
      `[${título}](${link})\n` +
      `![Capa](${capa})`;
    await bot.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' });

    ctx.reply('Episódio adicionado com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar episódio:', error); 
    ctx.reply('Erro ao adicionar o episódio. Verifique o link.');
  }
});

bot.launch();

// Verifique por novos episódios periodicamente
setInterval(checkForNewEpisodes, 1000 * 60 * 5); 

// Iniciar servidor para a Vercel
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('API Telegram AnimeFire.Plus');
});

module.exports = app;
