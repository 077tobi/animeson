const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio'); // Adicione o cheerio aqui

const app = express();
const port = 3000;

// Função para obter os links da página
async function getLinks(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    // Aguardar o carregamento do iframe com a classe 'metaframe'
    await page.waitForSelector('iframe.metaframe');

    // Obter o conteúdo HTML do iframe
    const iframeContent = await page.evaluate(() => {
      const iframe = document.querySelector('iframe.metaframe');
      return iframe.contentDocument.body.innerHTML;
    });

    const $ = cheerio.load(iframeContent); // Use o cheerio aqui

    const links = []; // Array para armazenar os links

    // Selecionar os links dentro do iframe
    $('a[href^="https"]').each((index, element) => {
      const link = $(element).attr('href');
      links.push(link);
    });

    await browser.close();

    return links;
  } catch (error) {
    console.error(error);
    return []; // Retorna um array vazio em caso de erro
  }
}

// Rota para obter os links
app.get('/links/:url', async (req, res) => {
  const url = req.params.url;
  const links = await getLinks(url);
  res.json(links);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
