
// IMPORTAÇÕES
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// CONFIGURAÇÃO DO BANCO DE DADOS 
async function setup() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS leituras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            valor REAL,
            descricao TEXT
        )
    `);
    return db;
}

// ROTAS DA API (ENDPOINTS)
setup().then((db) => {
    
    // Rota de Diagnóstico
    app.get('/', (req, res) => {
        res.send('Servidor SiteGeek Online.');
    });

    // Rota para Inserção de Dados (POST)
    app.post('/api/leituras', async (req, res) => {
        const { valor, descricao } = req.body;
        try {
            await db.run(
                'INSERT INTO leituras (valor, descricao) VALUES (?, ?)',
                [valor, descricao]
            );
            res.status(201).json({ status: "Sucesso" });
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    });

    // Rota para Consulta de Dados (GET)
    app.get('/api/leituras', async (req, res) => {
        const dados = await db.all('SELECT * FROM leituras ORDER BY timestamp DESC');
        res.json(dados);
    });

    // INICIALIZAÇÃO DO SERVIDOR
    app.listen(PORT, () => {
        console.log(` HTTP: http://localhost:${PORT}`);
    });

}).catch(err => {
    console.error('Erro de Inicialização:', err);
});