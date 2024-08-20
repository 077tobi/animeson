const express = require('express');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer'); 

const app = express();
const port = 3000;

let episodes = [];

async function updateEpisodes() {
  try {
    const browser = await puppeteer.launch({
      // Adicione configurações para melhorar a performance
      headless: true, // Execute o navegador sem interface gráfica
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Reduz o consumo de recursos
      defaultNavigationTimeout: 10000 // Define um tempo limite de 10 segundos para o carregamento
    });
    const page = await browser.newPage();
    await page.goto('https://goyabu.to/home-2');

    // Aguardar o carregamento completo da página (verifique se 'article.boxEP' é o seletor correto)
    await page.waitForSelector('article.boxEP'); 

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
      const link = $(element).find('a').attr('href');
      const title = $(element).find('h3').text().trim();
      const episode = $(element).find('span.titleEP').text().trim();
      const image = $(element).find('img').attr('src');
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
