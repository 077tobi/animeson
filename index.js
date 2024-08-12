const express = require('express');
const admin = require('firebase-admin');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

app.use(express.json());

const serviceAccount = {
  "type": "service_account",
  "project_id": "revon-chat",
  "private_key_id": "29496838641402f0ab85a2b034d200f92684a87e",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+mn9Rnfi043BO\n3v+8uO7HifOchn0o7vfkobmYoj/qaLTLVDkZoeTuMJQyPp3EDzjFM1hPDnurwxxa\nlaEMms5uW/maRVzmlA/DfWvZNy/TgLzhvg1yVr2Ph7QUHmxm9pwmnkPj/wAKHYXy\nuOw8hwcLH/Ppso3O/eYaI1oc+km7ZMEMdBDfAwhxkIdG2KG48YeuX9CEoQaZiNA3\neXZuqQmS/Jj1UxJ1lCVJYI01KlMWzafpGv2Sf5pgLZ6ggvMc1B4EySk+8pTPAmLk\nbhRmAxYCvkwI+3Xl/NKJGJGgIEh3HIuEqJ8CUofpyQH4IgUfQK/VZlxqaUCEBjrC\nyNMe8cNnAgMBAAECggEAKm2gzs2/6aBBRUVNnzh5arCSKnMjlEORqfK4KjpfyPHS\n4PoYFdUcbUsiCgc3Pkf3JqqVy09ZhzQQ8TcimPgy4I0XxFgRZIBr++PE6J7oxgd/\nxC52ts+JNdSK6PmWvtrBirUrPqrqWtYUlaHFcHnMPxU3SfvFpmCNYp8g9ZdfZ1eU\nYVGE1PyKbZPlVWbLZNEtGrNvu9aifqCGZTcl4fZZeROg/qDSngr/6e1uFNpwndRh\nlzeYYGKsj05N84eClU5TdOw/jywADlTxZhP9x4mja3TpNXnkCOw417lw330P0bvV\nFwCef6MoftXEgz/OUKQJx8LN4qRYwzcmnu1qNcCwUQKBgQD/cWGwWAuHg0BNqmLF\n1MDwS/UDWwEBi0GLhJ/189Ef4CqBMCxBiK9N1T88RneDcdXylwgQqz0fMcbvkNhU\noDqjIPBdu2MTD8VcnBYQ8qkQsqrzRelBGTPdQWTYJc9z3bKY4zacxAGDPkThLeDa\n19/PMTQtnWmr0Cen7Jx5eHRBVwKBgQC/BOor+rvQvMl711T3+96kq6UCbwet2tX8\nhOqyf6pBAp5lHhRlJcGh1jfCjRrB88Irp36iQRQewYSJkFsdlzH6F3O+pw8sfiBU\nU8c+kcyKSlcfjGp5DDL/FyQ9tCfDOLQroTItejSNjca8BR0sRX6dNSr8TGJuSe7p\n6KRXazb0cQKBgCXrrgXgvC1s1aHx9mHJ+K5ziDbsTpTtGFje4mQ/wr7Jp2WwQhGk\neenDC3UmPN29i3ZM53yZ/yPfXtn3lbXSZ4IKBMTVaZrNz420+i2f6Gs7KtecfEkW\ntbVV3OOdkVNxCO9bY6MYEeVq3AzVo7i5LVdzxXw0DxjbeNeb74q00AVXAoGAAOOT\n92puT1Vhlqr04UaRzbBizzUXEw8OqeMweG4xq6XIeO3/6EyZrxghIE2pzzdEMxHP\nfA/TeSUrabx7QBMBD4nmZv++CVX47ouJRNhG3GnmJ+ZuZGvTHO7No1/gQ39TD1Tr\nt9x2vCXpw9w+O4ODSFYEAjKUzrCXZQ1JHoMIOXECgYEA+NTjQmYKzrNhxr9Zcqgb\nJw/nrpaAFgwN8XmELVHQh/cbQVGx4vtgBu1P/v3TeNLyWnBfAfMq3kSV4cnY5MVt\nqllFB6ZnTaDZiWeM/Ytw7mGY/F75L0tC6WF9gVQk6TCPkhW/FUYBpoZgQIK/ywCI\n3P56Zo02rCtUQCktsTbIUvc=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-d0nlp@revon-chat.iam.gserviceaccount.com",
  "client_id": "102608625326510160577",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d0nlp@revon-chat.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://revon-chat-default-rtdb.firebaseio.com/'
});

const db = admin.database();

app.get('/animes', async (req, res) => {
  try {
    const animesRef = db.ref('animes');
    const animesSnapshot = await animesRef.once('value');
    const animes = animesSnapshot.val();
    res.json(animes);
  } catch (error) {
    console.error("Erro ao obter animes:", error);
    res.status(500).json({ error: "Erro ao obter animes", details: error.message });
  }
});

app.post('/animes', async (req, res) => {
  const novoAnime = req.body;
  try {
    if (!novoAnime.titulo || !novoAnime.link) {
      return res.status(400).json({ error: "Dados inválidos" });
    }
    const animesRef = db.ref('animes');
    await animesRef.push(novoAnime);
    res.json({ message: 'Anime adicionado com sucesso!' });
  } catch (error) {
    console.error("Erro ao adicionar anime:", error);
    res.status(500).json({ error: "Erro ao adicionar anime", details: error.message });
  }
});

app.get('/episodios/:animeLink', async (req, res) => {
  const animeLink = req.params.animeLink;

  try {
    const response = await axios.get(animeLink);
    const html = response.data;

    const $ = cheerio.load(html);
    const itemElements = $('div.div_video_list a.lEp');

    const itemInfoList = [];
    itemElements.each((index, element) => {
      const link = $(element).attr('href');
      const titulo = $(element).text();

      itemInfoList.push({
        "link": link,
        "titulo": titulo
      });
    });

    res.json(itemInfoList);
  } catch (error) {
    console.error("Erro ao obter episódios:", error);
    res.status(500).json({ error: "Erro ao obter episódios", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
                        
