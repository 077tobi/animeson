const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/api/animefire', async (req, res) => {
  const url = "https://animefire.plus/animes/ookami-to-koushinryou-merchant-meets-the-wise-wolf-todos-os-episodios";

  try {
    const response = await axios.get(url, { timeout: 20000 }); 
    const html = response.data;
    const $ = cheerio.load(html);

    const animeTitle = $('h1.page-title').text().trim(); 

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
    console.error('Error fetching data:', error.response.status, error.response.data); 
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
