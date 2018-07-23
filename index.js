var http = require('http');
var fs = require("fs");


http.createServer(function(request, response){
    if(request.url === '/'){
        fs.readFile("index.html", function(err, data){
            console.log('get connetion')
            if(err){
                console.log('return respons code 404')
                response.writeHead(404);
                response.write("Not Found!");
             }else{
                 console.log('return respons code 200')
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
             }
            response.end();
          });
    }else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url)
        response.end();
    }
}).listen(5000);