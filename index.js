const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/api/visioncine/episodes/:animeId', async (req, res) => {
  const animeId = req.params.animeId;
  const url = `https://www.visioncine.com/anime/${animeId}`;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const episodes = [];
    $('.episodios .episodio').each((index, element) => {
      const episodeLink = $(element).find('a').attr('href');
      const episodeTitle = $(element)
        .find('.episodio-titulo')
        .text()
        .trim();
      const episodeNumber = $(element)
        .find('.episodio-numero')
        .text()
        .trim();
      const imageUrl = $(element).find('img').attr('src');

      episodes.push({
        episodeLink,
        episodeTitle,
        episodeNumber,
        imageUrl,
      });
    });

    res.json(episodes);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
