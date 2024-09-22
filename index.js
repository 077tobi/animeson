const express = require('express');
const puppeteer = require('puppeteer'); // Biblioteca para renderização de páginas web
const app = express();
const port = 3000;

// Rota para obter os novos lançamentos de animes
app.get('/animes', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://animefire.plus/');

    // Esperar que o JavaScript do site seja executado
    await page.waitForSelector('.containerAnimes');

    // Analisar o HTML da página renderizada
    const content = await page.content();
    const $ = cheerio.load(content);

    // Extrair os dados dos animes
    const animesData = $('.containerAnimes').map((index, element) => {
      // ... (mesma lógica de extração do código anterior)
    }).get();

    // Retornar os dados dos animes em formato JSON
    res.json(animesData);

    await browser.close();
  } catch (error) {
    console.error('Erro ao raspar o site:', error);
    res.status(500).json({ error: 'Erro ao obter os dados' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
