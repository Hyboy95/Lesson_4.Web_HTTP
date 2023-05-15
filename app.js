const http = require('http');
const server = http.createServer((req, res) => {
    res.write('<h1> Hello World! </h1>');
    res.end();
})
server.listen(8000,'localhost', ()=> console.log('Server is running...'));