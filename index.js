const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/new-episodes', async (req, res) => {
  try {
    const response = await axios.get('https://animesdigital.org/');
    const $ = cheerio.load(response.data);

    const episodes = [];
    $('.episode-block').each((index, element) => {
      const title = $(element).find('.episode-title a').text().trim();
      const episodeNumber = $(element).find('.episode-number').text().trim();
      const episodeLink = $(element).find('.episode-title a').attr('href');
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
