import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

async function main() {
    // Abrindo o banco no caminho que o Grafana consegue ler
    const db = await open({
        filename: '/var/lib/sqlite_data/database.sqlite',
        driver: sqlite3.Database
    });

    console.log("✅ Banco de dados conectado!");

    // Rota para salvar
    app.post('/salvar', async (req, res) => {
        const { valor, descricao } = req.body;
        try {
            await db.run(
                'INSERT INTO leituras (valor, descricao) VALUES (?, ?)',
                [valor, descricao]
            );
            res.status(201).json({ message: 'Salvo com sucesso!' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.listen(3001, () => {
        console.log("🚀 Servidor rodando em http://localhost:3001");
    });
}

main();