const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/api/animefire/:animeId', async (req, res) => {
  const animeId = req.params.animeId;
  const url = `https://animefire.plus/animes/${animeId}-todos-os-episodios`;

  try {
    const response = await axios.get(url, { timeout: 10000 });
    const html = response.data;
    const $ = cheerio.load(html);

    // Extrair o título do anime
    const animeTitle = $('h1.page-title').text().trim();

    // Extrair a lista de episódios
    const episodes = [];
    $('.div_video_list a.lEp').each((index, element) => {
      const episodeLink = $(element).attr('href');
      const episodeTitle = $(element).text().trim();

      episodes.push({
        episodeLink,
        episodeTitle
      });
    });

    const data = {
      animeTitle,
      episodes
    };

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
