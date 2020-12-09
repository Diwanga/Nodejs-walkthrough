const http = require('http');
// import http from 'http';

const server = http.createServer((req, res) => {

    // console.log(req);
    const url = req.url
    const method = req.method
    if (url === "/") {
        res.setHeader("Content-type", "text/html");
        res.write('<html>');
        res.write('<head><title>MY first node response</title></head>');
        res.write('<body> <form action ="/message" method ="POST"><input type="text" name = "message"> <button type="submit">SEND</button></form></body>');
        res.write('</head>');
        res.write('</head>');
        res.write('</html>');
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        res.statusCode = 302;
        res.setHeader("Location", "/")   //REDIRECTING
        return res.end();

    }
    res.setHeader("Content-type", "text/html");
    res.write('<html>');
    res.write('<head><title>node req routing</title></head>');
    res.write('<body><h1> DIWANGA AMASITH KARIYWASAM</h1></body>');
    res.write('</head>');
    res.write('</head>');
    res.write('</html>');
});

server.listen(3001);
