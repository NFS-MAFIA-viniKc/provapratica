import fs from 'fs';
import { randomUUID } from 'crypto';
import express from 'express';

const server = express();
server.use(express.json());

const PORT = 8000;

// Rota GET raiz
server.get('/', (req, res) => {
    console.log('rota get');
    res.send('pintu');
});

// Rota POST /logs/registros
server.post('/logs/registros', (req, res) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).send('nome precisa ser preenchido');
    }

    const mensagem = {
        id: randomUUID(),
        mensagem: 'criado com sucesso',
    };

    fs.readFile('logs.txt', 'utf-8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Erro ao ler arquivo:', err);
            return res.status(500).send('erro servidor');
        }

        const logs = data ? JSON.parse(data) : [];
        logs.push(mensagem);

        fs.writeFile('logs.txt', JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error('erro ao escrever arquivo:', err);
                return res.status(500).send('erro servidor');
            }

            return res.status(201).json(mensagem);
        });
    });
});

// Rota POST /logs
server.post("/logs", (req, res) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).send("Nome é obrigatorio");
    }

    const mensagem = {
        id: randomUUID(),
        mensagem: "Log criado com sucesso!",
    };

    fs.readFile("logs.txt", "utf-8", (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error("Erro ao ler arquivo:", err);
            return res.status(500).json("Internal Server Error");
        }

        const logs = data ? JSON.parse(data) : [];
        logs.push(mensagem);

        fs.writeFile("logs.txt", JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error("Erro ao escrever arquivo:", err);
                return res.status(500).send("Internal Server Error");
            }

            return res.status(200).json({ id: mensagem.id, mensagem: mensagem.mensagem });
        });
    });
});

// Rota GET /logs/:id
server.get('/logs/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile('logs.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler arquivo:', err);
            return res.status(500).json('erro servidor');
        }

        const logs = data ? JSON.parse(data) : [];
        const log = logs.find(log => log.id === id);

        if (!log) {
            return res.status(404).json('Log not found');
        }

        return res.status(200).json(log);
    });
});

// Inicialização do servidor
server.listen(PORT, () => console.log(`Servidor está rodando na porta: ${PORT}`));