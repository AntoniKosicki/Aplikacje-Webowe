const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db;

async function connectMongo() {
    try {
        await mongoClient.connect();
        db = mongoClient.db('blogLogs');
        console.log('Polaczono z MongoDB Atlas');
    } catch (err) {
        console.error('Blad polaczenia z MongoDB:', err);
    }
}
connectMongo();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Serwer dziala. Sprawdz /api/posts lub /api/error-test');
});

app.use(async (req, res, next) => {
    if (db && req.path !== '/') {
        try {
            await db.collection('accessLogs').insertOne({
                timestamp: new Date(),
                method: req.method,
                url: req.url,
                ip: req.ip
            });
        } catch (err) {
            console.error('Blad zapisu logu:', err);
        }
    }
    next();
});

app.get('/api/posts', async (req, res, next) => {
    try {
        const posts = await prisma.wpis.findMany();
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

app.get('/api/error-test', (req, res, next) => {
    next(new Error("Testowy blad do MongoDB"));
});

app.use(async (err, req, res, next) => {
    if (db) {
        try {
            await db.collection('errorLogs').insertOne({
                timestamp: new Date(),
                message: err.message,
                url: req.url
            });
        } catch (mongoErr) {
            console.error('Blad zapisu bledu do bazy:', mongoErr);
        }
    }
    res.status(500).json({ status: "error", message: err.message });
});

app.listen(PORT, () => console.log(`Serwer na http://localhost:${PORT}`));