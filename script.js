import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
    console.log('rota get');
    res.send('pintu');
})
app.listen(PORT, () => console.log(`Servidor esta rodando na porta ${PORT}`));

