const http = require('http');
const fs = require('fs');
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('Strona główna');
    }
    else if (parsedUrl.pathname === '/json') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify({"name": "Antoni"}));
    }
    else if (parsedUrl.pathname === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const html = "<h1>HTML</h1>";
        res.end(html);
    }
    else if (parsedUrl.pathname === '/plik') {
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
    else if(parsedUrl.pathname ==='/get_params'){
        const timestamp = Date.now();
        console.log(parsedUrl.query);
        fs.writeFile(`params_${timestamp}.json`, JSON.stringify(parsedUrl.query), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Plik został zapisany");
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify({"ok": "ok"}));
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
}).listen(3000);