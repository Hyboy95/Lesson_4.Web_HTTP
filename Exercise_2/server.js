const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./view/calculator.html', (err, data) => {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data',chunk => {
            data += chunk;
        })
        req.on('end',() => {
            const value = qs.parse(data);
            fs.readFile('./view/Result.html', "utf-8", (err, dataHtml) => {
                if (err) console.log(err);
                dataHtml = dataHtml.replace('{result}', eval(`${value.a_num} ${value.operator} ${value.b_num}`));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(dataHtml);
                return res.end();
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})

server.listen(8000,()=> {
    console.log('Server is running at localhost: 8000')
})