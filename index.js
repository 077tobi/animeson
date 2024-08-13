const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/api/visioncine', async (req, res) => {
  const url = "https://www.visioncine-2.com/watch/make-heroine-ga-oosugiru"; // URL fixa

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extrair o título do anime
    const animeTitle = $('h1.text-light').text().trim(); 

    // Extrair lista de episódios
    const episodes = [];
    $('.ep').each((index, element) => {
      const episodeNumber = $(element).find('p[number]').text();
      const episodeLink = $(element).find('a.btn.free').attr('href'); 
      const episodeDuration = $(element).find('.info p:nth-child(1)').text().trim();
      const episodePublished = $(element).find('.info p:nth-child(2)').text().trim();
      const episodeImageUrl = $(element).find('.image').attr('style').split('url(\'')[1].split('\')')[0];

      episodes.push({
        episodeNumber,
        episodeLink,
        episodeDuration,
        episodePublished,
        episodeImageUrl
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
