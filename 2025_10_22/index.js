const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Strona główna')
})
app.get('/json', (req, res) => {
    res.json({ Imie: 'Antoni' })
})
app.get('/html', (req, res) => {
    res.send('<h1>HTML</h1>')
})
app.get('/plik', (req, res) => {
    res.sendFile(path.join(__dirname, 'plik.html'))
})

app.get('/get_params', (req, res) => {
    console.log(req.query)
    const timestamp = Date.now()
    fs.writeFile(`params_${timestamp}.json`, JSON.stringify(req.query, null, 2), (err) => {
        if (err) {
            console.error(err)
            res.status(500).send('Error occured')
            return
        }
        res.json(req.query)

    })
})
app.use((req, res) => {
    res.status(404).send('404')
})
app.listen(3000, ()=>{
    console.log('Server jest na porcie http://localhost:3000 :)')
})