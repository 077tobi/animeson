const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/api/avatar/:name', async (req, res) => {
  const name = req.params.name;
  const url = `https://anime.kirwako.com/api/avatar?name=${name}`;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const imgSrc = $('img').attr('src');

    if (imgSrc) {
      const jsonData = {
        avatar: imgSrc
      };
      res.json(jsonData);
    } else {
      res.status(404).json({ error: 'Avatar not found' });
    }
  } catch (error) {
    console.error('Error fetching avatar:', error);
    res.status(500).json({ error: 'Failed to fetch avatar' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
