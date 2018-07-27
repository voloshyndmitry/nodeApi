var http = require('http');
var fs = require("fs");
const { parse } = require('querystring');  //use it to parse form data
const headCors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Content-Type': 'application/json'
}

http.createServer(function (request, response) {
    if (request.url === '/') {
        fs.readFile("index.html", function (err, data) {
            if (err) {
                console.log('return respons code 404')
                response.writeHead(404);
                response.write("Not Found!");
            } else {
                console.log('return respons code 200')
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
            }
            response.end();
        });
    } else if (request.url === '/login' && request.method === 'POST') {
        let body = '';
        response.writeHead(200, headCors);
        let responseStatus = {
            autorization: 'fail'
        };

        request.on('data', chunk => {
            body += chunk.toString(); // конвертировать буфер в строку 
        });

        request.on('end', () => {
            body = JSON.parse(body)

            let isUser = checkAuthorization(body.login, body.pass)
            if (isUser) {
                responseStatus.autorization = 'success'
            }
            response.end(JSON.stringify(responseStatus));
        });
    }
    else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url)
        response.end();
    }
}).listen(process.env.PORT || 8080);

function checkAuthorization(login, pass) {
    let request = false
    
    if (login === 'elena' && pass === '123') {
        request = true
    }

    return request
}