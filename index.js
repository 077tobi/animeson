const cheerio = require('cheerio');
     const puppeteer = require('puppeteer'); // Importe o Puppeteer

     const app = express();
     const port = 3000;

     // Array para armazenar os episódios
     let episodes = [];

     // Função para atualizar a lista de episódios
     async function updateEpisodes() {
         try {
             const browser = await puppeteer.launch();
             const page = await browser.newPage();
             await page.goto('https://goyabu.to/home-2');

             // Aguardar o carregamento completo da página
             await page.waitForSelector('article.boxEP');

             // Obter o HTML da página
             const html = await page.content();
             const $ = cheerio.load(html);

             episodes = []; // Limpa a lista atual

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

     // Atualiza a lista de episódios a cada X segundos (ajuste o valor)
     setInterval(updateEpisodes, 10000); // Atualiza a cada 10 segundos

     // Rota para obter a lista de episódios
     app.get('/episodes', (req, res) => {
         res.json(episodes);
     });

     app.listen(port, () => {
         console.log('Servidor rodando na porta', port);
         updateEpisodes(); // Chama a função para atualizar a lista de episódios inicialmente
     });
