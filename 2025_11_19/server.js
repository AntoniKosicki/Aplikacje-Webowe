const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/kategorie', async (req, res) => {
    const kategorie = await prisma.kategoria.findMany();
    res.json(kategorie);
});

app.post('/kategorie', async (req, res) => {
    const { nazwa } = req.body;
    const nowaKategoria = await prisma.kategoria.create({
        data: { nazwa }
    });
    res.json(nowaKategoria);
});

app.delete('/kategorie/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.kategoria.delete({
        where: { id: parseInt(id) }
    });
    res.json({ message: "Kategoria usunięta" });
});

app.get('/wpisy', async (req, res) => {
    const wpisy = await prisma.wpis.findMany({
        include: { kategoria: true }
    });
    res.json(wpisy);
});

app.post('/wpisy', async (req, res) => {
    const { tytul, tresc, kategoriaId } = req.body;
    const nowyWpis = await prisma.wpis.create({
        data: {
            tytul,
            tresc,
            kategoriaId: parseInt(kategoriaId)
        }
    });
    res.json(nowyWpis);
});

// 6. Aktualizuj wpis (np. zmiana treści)
app.put('/wpisy/:id', async (req, res) => {
    const { id } = req.params;
    const { tytul, tresc } = req.body;
    const zaktualizowany = await prisma.wpis.update({
        where: { id: parseInt(id) },
        data: { tytul, tresc }
    });
    res.json(zaktualizowany);
});

app.get('/wpisy/:wpisId/komentarze', async (req, res) => {
    const { wpisId } = req.params;
    const komentarze = await prisma.komentarz.findMany({
        where: { wpisId: parseInt(wpisId) }
    });
    res.json(komentarze);
});

app.post('/komentarze', async (req, res) => {
    const { tresc, wpisId } = req.body;
    const nowyKomentarz = await prisma.komentarz.create({
        data: {
            tresc,
            wpisId: parseInt(wpisId)
        }
    });
    res.json(nowyKomentarz);
});

app.delete('/komentarze/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.komentarz.delete({
        where: { id: parseInt(id) }
    });
    res.json({ message: "Komentarz usunięty" });
});

app.listen(PORT, () => {
    console.log(`Serwer Blog-backend (Prisma 7) działa na http://localhost:${PORT}`);
});