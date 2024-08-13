const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/api/anroll/episodes/:animeId', async (req, res) => {
    const animeId = req.params.animeId; // Pega o ID do anime da URL
    const url = `https://www.anroll.net/a/${animeId}`; // Monta a URL da página de detalhes

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const episodes = [];
        $('.itemlistepisode').each((index, element) => {
            const episodeLink = $(element).find('a').attr('href');
            const episodeTitle = $(element).find('.titulo_episodio').text().trim();
            const episodeNumber = $(element).find('.n_episodio span').text().trim();
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
