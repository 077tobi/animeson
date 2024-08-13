const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/api/animefire/latest', async (req, res) => {
    const url = 'https://animefire.plus/'; // URL da página inicial

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const episodes = [];
        $('.divCardUltimosEpsHome').each((index, element) => {
            const episodeLink = $(element).find('a').attr('href');
            const animeTitle = $(element).find('.animeTitle').text().trim();
            const episodeNumber = $(element).find('.numEp').text().trim();
            const imageUrl = $(element).find('.imgAnimesUltimosEps').attr('data-src');
            const episodeDate = $(element).find('.ep-dateModified').attr('data-date-modified');

            episodes.push({
                episodeLink,
                animeTitle,
                episodeNumber,
                imageUrl,
                episodeDate
            });
        });

        res.json(episodes);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log('Server listening at http://localhost:${port}');
});
