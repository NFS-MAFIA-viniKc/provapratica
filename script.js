import express from 'express';
import bodyParser from 'body-parser';

const server = express();
const PORT = 8000;

server.use(bodyParser.json());
server.get('/', (req, res) => {
    console.log('rota get');
    res.send('pintu');
})

server.get('/logs', (req, res) => {
    const { id } = req.params;
fstat.readFile('logs.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro', err);
            return res.status(500).json('erro servidor');
        }

        const logs = data ? JSON.parse(data) : [];
        const log = logs.find(log => log.id === id);

        if (!log) {
            return res.status(404).json('Log not found');
        }

        return res.json(log);
    });
})

server.listen(PORT, () => console.log(`Servidor esta rodando na porta:${PORT}`));

