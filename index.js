const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/new-episodes', async (req, res) => {
  try {
    const response = await axios.get('https://www.crunchyroll.com/pt-br/new');
    const $ = cheerio.load(response.data);

    const episodes = [];
    $('.media-grid-item').each((index, element) => {
      const title = $(element).find('.media-grid-item-title').text().trim();
      const episodeNumber = $(element).find('.media-grid-item-episode').text().trim();
      const episodeLink = $(element).find('.media-grid-item-link').attr('href');
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
