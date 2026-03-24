import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();

// Porta 3001 para evitar conflito com o Grafana na 3000
const PortaServidor = process.env.PORT || 3001;

// Middlewares - OBRIGATÓRIOS para o React conseguir enviar dados
app.use(cors());
app.use(express.json());

async function main() {
    // Abre o banco de dados na pasta do servidor
    const db = await open({
        filename: './database.sqlite', 
        driver: sqlite3.Database
    });

    // Cria a tabela de produtos se ela não existir
    await db.exec(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        categoria TEXT NOT NULL,
        imagem_url TEXT,
        estoque INTEGER DEFAULT 0
      )
    `);

    console.log("✅ Banco de dados SiteGeek pronto!");

    // Rota para postar novos produtos (Admin)
    app.post('/produtos', async (req, res) => {
        const { nome, preco, categoria, imagem_url, estoque } = req.body;
        try {
            await db.run(
                'INSERT INTO produtos (nome, preco, categoria, imagem_url, estoque) VALUES (?, ?, ?, ?, ?)', 
                [nome, preco, categoria, imagem_url, estoque || 0]
            );
            res.status(201).json({ message: 'Produto Geeks postado com sucesso!' });
        } catch (err) {
            console.error("Erro ao salvar:", err.message);
            res.status(500).json({ error: err.message });
        }
    });

    // Rota para o cliente buscar os produtos (Vitrine)
    app.get('/produtos', async (req, res) => {
        try {
            const produtos = await db.all('SELECT * FROM produtos');
            res.json(produtos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Inicializa o servidor
    app.listen(PortaServidor, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PortaServidor}`);
    });
}

// Chamar a função principal
main().catch(err => {
    console.error("Erro ao iniciar o servidor:", err);
});