const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./view/register.html',(err, data) => {
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('./view/info.html', 'utf-8', (err, datahtml) => {
                if (err) {
                    console.log(err.message);
                }
                datahtml = datahtml.replace('{name}', userInfo.name);
                datahtml = datahtml.replace('{email}', userInfo.email);
                datahtml = datahtml.replace('{password}', userInfo.password);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(datahtml);
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