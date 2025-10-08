let http = require('http');
let fs = require('fs');
let path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Strona główna');
    }
    else if (req.url == '/json') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify({"name": "Antoni"}));
    }
    else if (req.url == '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const html = "<h1>HTML</h1>";
        res.end(html);
    }
    else if (req.url == '/plik') {
        let pathName = path.join(__dirname, "plik.html");
        fs.readFile(pathName, function (err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(err);
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
}).listen(8080);