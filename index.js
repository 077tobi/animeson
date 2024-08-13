const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/api/anroll/latest', async (req, res) => {
    const url = 'https://anroll.net/'; // URL da página inicial

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Extrair lista de episódios
        const episodes = [];
        $('li.release-item').each((index, element) => {
            const episodeLink = $(element).find('a').attr('href');
            const animeTitle = $(element).find('h1').text().trim();
            const episodeNumber = $(element).find('span.episode-badge b').text();
            const imageUrl = $(element).find('img').attr('src');

            episodes.push({
                episodeLink,
                animeTitle,
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
