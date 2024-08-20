const express = require('express');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer'); 

const app = express();
const port = 3000;

let episodes = [];

async function updateEpisodes() {
  try {
    const browser = await puppeteer.launch({
      headless: true, 
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultNavigationTimeout: 10000
    });
    const page = await browser.newPage();
    await page.goto('https://goyabu.to/home-2');

    await page.waitForSelector('article.boxEP'); // Ajuste o seletor conforme o HTML

    // Desabilitar recursos não essenciais (opcional)
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet') {
        request.abort();
      } else {
        request.continue();
      }
    });

    const html = await page.content();
    const $ = cheerio.load(html);

    episodes = [];

    $('article.boxEP').each((index, element) => {
      const link = $(element).find('a.episode-link').attr('href'); // Ajuste o seletor
      const title = $(element).find('h3.episode-title').text().trim(); // Ajuste o seletor
      const episode = $(element).find('span.episode-number').text().trim(); // Ajuste o seletor
      const image = $(element).find('img.episode-image').attr('src'); // Ajuste o seletor
      const dublado = $(element).attr('data-tar'); 
      const qualidade = $(element).attr('data-qualy'); 

      episodes.push({
        link,
        title,
        episode,
        image,
        dublado,
        qualidade
      });
    });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

setInterval(updateEpisodes, 10000); 

app.get('/episodes', (req, res) => {
  res.json(episodes);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  updateEpisodes(); 
});
