const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')));

// Ścieżki podstron
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/o-nas', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/oferta', (req, res) => res.sendFile(path.join(__dirname, 'views', 'offer.html')));
app.get('/kontakt', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));

app.post('/kontakt', (req, res) => {
    console.log('--- Otrzymano nową wiadomość z formularza ---');
    console.log('Imię:', req.body.imie);
    console.log('Nazwisko:', req.body.nazwisko);
    console.log('Email:', req.body.email);
    console.log('Treść:', req.body.wiadomosc);
    console.log('---------------------------------------------');

    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Serwer śmiga! Wejdź na http://localhost:${PORT}`);
});