const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await prisma.wpis.findMany();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.wpis.findUnique({
            where: { id: parseInt(id) },
            include: { komentarze: true }
        });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/posts/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const { tresc, autor } = req.body;
        const newComment = await prisma.komentarz.create({
            data: {
                tresc,
                autor,
                wpisId: parseInt(id)
            }
        });
        res.json(newComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Backend running on port 3000'));