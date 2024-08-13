const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/api/episodes', async (req, res) => {
  const url = 'http://visioncine-2.com/watch/sakamoto-desu-ga'; // URL da página

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const episodes = [];

    $('.ep').each((index, element) => {
      const episodeNumber = $(element).find('p[number]').text().trim();
      const episodeTitle = $(element)
        .find('.info h5.fw-bold')
        .text()
        .trim();
      const episodeDuration = $(element)
        .find('.info .small:nth-child(1)')
        .text()
        .trim();
      const episodePublished = $(element)
        .find('.info .small:nth-child(2)')
        .text()
        .trim();
      const episodeLink = $(element)
        .find('.buttons a.btn.free')
        .attr('href');
      const episodeImage = $(element)
        .find('.image')
        .attr('style')
        .split('url(')[1]
        .replace(')', '')
        .trim(); // Extraindo a URL da imagem

      episodes.push({
        episodeNumber,
        episodeTitle,
        episodeDuration,
        episodePublished,
        episodeLink,
        episodeImage,
      });
    });

    res.json(episodes);
  } catch (error) {
    console.error('Erro ao obter os dados:', error);
    res.status(500).json({ error: 'Falha ao obter dados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
