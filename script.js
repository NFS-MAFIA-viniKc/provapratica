import express from 'express';
import bodyParser from 'body-parser';

const server = express();
const PORT = 8000;

server.use(bodyParser.json());
server.get('/', (req, res) => {
    console.log('rota get');
    res.send('pintu');
})

server.post('/logs/registros', (req, res) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).send('nome precisa ser preenchido');
    }
    const mensagem = {
        id: randomUUID(),
        mensagem: '',
    }

    fs.readFile('logs.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler arquivo:', err);
            return res.status(500).send('erro servidor');
        }

        const logs = data ? JSON.parse(data) : [];
        mensagem.mensagem = "criado com sucesso"
        logs.push(mensagem);

        fs.writeFile('logs.txt', JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error('erro ao escrever arquivo:', err);
                return res.status(500).send('erro servidor');
            }

            return res.status(201).json(user);
        });
    });
})


    

server.get('/logs', (req, res) => {
    const { id } = req.params;

fs.readFile('logs.txt', 'utf-8', (err, data) => {
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

