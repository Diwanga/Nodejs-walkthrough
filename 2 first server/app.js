const http = require('http');
// import http from 'http';
const route = require("./route"); //custom module
const { errorMonitor } = require('events');

const server = http.createServer(route);

//route eken object ekak export karanm route.handelr kiyala function eka allanna ona.
server.listen(3001);
