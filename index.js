const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/new-episodes', async (req, res) => {
  try {
    const response = await axios.get('https://animefire.plus/');
    const $ = cheerio.load(response.data);

    const episodes = [];
    $('.anime-item').each((index, element) => {
      const title = $(element).find('.anime-name a').text().trim();
      const episodeNumber = $(element).find('.anime-episode').text().trim();
      const episodeLink = $(element).find('.anime-name a').attr('href');
      episodes.push({ title, episodeNumber, episodeLink });
    });

    res.json(episodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar episódios' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
