const http = require('http');
// import http from 'http';

const server = http.createServer((req, res) => {

    console.log(req);
    res.setHeader("Content-type", "text/html");
    res.write('<html>');
    res.write('<head><title>MY first node response</title></head>');



    res.write('<body><h1> DIWANGA AMASITH KARIYWASAM</h1></body>');
    res.write('</head>');
    res.write('</head>');


    res.write('</html>');
    res.end();


});

server.listen(3001);
