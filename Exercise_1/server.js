const http = require('http');
const fs = require('fs');
const qs = require('qs');

const arr = [];
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./view/todo.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const works = qs.parse(data);
            arr.unshift(works)
            fs.readFile('./view/display.html', 'utf-8', (err, datahtml) => {
                if (err) {
                    console.log(err.message);
                }
                let index = arr.length
                for (let i = 0; i < arr.length; i++) {
                    datahtml = datahtml.replace('<div id="result">', '<div id="result">' + '<p>' + index-- + ". " + arr[i].data + '</p>')
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(datahtml);
                return res.end();
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})

server.listen(8080, () => {
    console.log('Server is running at localhost: 8080')
})