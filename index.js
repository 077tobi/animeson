const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function getMp4Link(url) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);

    // Aguarde o carregamento do player de vídeo
    await page.waitForSelector('video');

    // Obtenha o atributo 'src' do elemento de vídeo
    const mp4Link = await page.$eval('video', (video) => video.src);

    await browser.close();

    return mp4Link;
  } catch (error) {
    console.error('Erro ao obter o link MP4:', error);
    return null;
  }
}

async function main() {
  const videoUrl = 'https://animesdigital.org/video/a/123101/';
  const mp4Link = await getMp4Link(videoUrl);

  if (mp4Link) {
    console.log('Link MP4:', mp4Link);
  }
}

main();
