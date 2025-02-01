// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var comments = [];

var server = http.createServer(function(req, res) {
    // Parse the request URL
    var urlObj = url.parse(req.url, true);
    var query = urlObj.query;
    var pathname = urlObj.pathname;

    // If the request is a GET request
    if (req.method === 'GET') {
        if (pathname === '/') {
            // Read the index.html file
            fs.readFile('./index.html', 'utf8', function(err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('Not found');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            });
        } else if (pathname === '/comments') {
            // If the request is /comments, return the comments array
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(comments));
        } else {
            // Otherwise, return the requested file
            fs.readFile('.' + pathname, 'utf8', function(err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('Not found');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            });
        }
    } else if (req.method === 'POST') {
        // If the request is a POST request
        if (pathname === '/comments') {
            // If the request is /comments, parse the request body
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                // Add the comment to the comments array
                var comment = querystring.parse(body);
                comments.push(comment);
                res.writeHead(201, {'Content-Type': 'text/plain'});
                res.end('Comment added');
            });
        } else {
            // Otherwise, return a 404
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
        }
        } else {
            // Otherwise, return a 405
            res.writeHead(405, {'Content-Type': 'text/plain'});
            res.end('Method not allowed');
        }
    });
    
    // Start the server
    server.listen(3000, function() {
        console.log('Server is listening on port 3000');
    });