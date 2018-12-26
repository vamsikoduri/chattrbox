var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wws = require('./websocket-server');

var server = http.createServer(function(req,res){
    console.log('Responding to a request');


    var handleError = function(err,res){
        res.writeHead(404);
        res.end();
    }

    var filePath = extract(req.url);
    fs.readFile(filePath, function(err,data){

        if(err)
        {
            handleError(err, res);
            return
        }

        res.end(data);
    })
});

server.listen(3000);