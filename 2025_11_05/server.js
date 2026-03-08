const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pracownia_web' // Upewnij się, że taka baza istnieje w phpMyAdmin
});

db.connect((err) => {
    if (err) console.error('Błąd połączenia z bazą:', err);
    else console.log('Połączono z bazą MariaDB/MySQL (XAMPP)!');
});

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

// --- ŚCIEŻKI HTML (z poprzedniego zadania) ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/o-nas', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/oferta', (req, res) => res.sendFile(path.join(__dirname, 'views', 'offer.html')));
app.get('/kontakt', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));

app.post('/kontakt', (req, res) => {
    const { imie, nazwisko, email, wiadomosc } = req.body;
    const sql = 'INSERT INTO messages (imie, nazwisko, email, wiadomosc) VALUES (?, ?, ?, ?)';

    db.query(sql, [imie, nazwisko, email, wiadomosc], (err, result) => {
        if (err) {
            console.error('Błąd zapisu:', err);
            return res.status(500).send('Błąd serwera');
        }
        console.log('Wiadomość zapisana w bazie! ID:', result.insertId);
        res.redirect('/');
    });
});


app.get('/api/contact-messages', (req, res) => {
    db.query('SELECT * FROM messages', (err, results) => {
        if (err) return res.status(500).json({ error: 'Błąd bazy danych' });
        res.json(results);
    });
});

app.get('/api/contact-messages/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM messages WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Błąd bazy danych' });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Błąd 404: Brak wiadomości o takim ID' });
        }
        res.json(results[0]);
    });
});

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});