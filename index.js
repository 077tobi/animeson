const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment'); // Adicione a biblioteca moment

const app = express();
const port = 3000;

app.get('/api/animefire/new', async (req, res) => {
  const url = "https://animefire.plus/";

  try {
    const response = await axios.get(url, { timeout: 10000 });
    const html = response.data;
    const $ = cheerio.load(html);

    const newEpisodes = [];
    $('.divCardUltimosEpsHome').each((index, element) => {
      const episodeLink = $(element).find('a').attr('href');
      const episodeTitle = $(element).find('.animeTitle').text().trim();
      const episodeNumber = $(element).find('.numEp').text().trim();
      const episodeImage = $(element).find('.card-img-top').attr('data-src'); 

      // *Correção:* Encontre o elemento que contém a data de publicação.
      // Você precisa inspecionar o HTML do Animefire para determinar o seletor correto.
      // Por exemplo, se a data estiver em um atributo 'data-date' dentro de um elemento 'span':
      const publishedDateStr = $(element).find('span').attr('data-date'); 

      if (publishedDateStr) {
        const publishedDate = moment(publishedDateStr).fromNow(); // Calcula o tempo desde a publicação
        newEpisodes.push({
          episodeLink,
          episodeTitle,
          episodeNumber,
          episodeImage,
          publishedDate
        });
      }
    });

    res.json(newEpisodes);
  } catch (error) {
    console.error('Error fetching data:', error.response.status, error.response.data);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
