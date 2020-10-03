const restify = require('restify');
const server = restify.createServer();

server.get('/', function (req, res, next) {
  res.send('Hello World!');
  return next();
});

server.get('/gustavo', function (req, res, next) {
  res.send('Qualquer mensagem que você quiser aí');
  return next();
});

server.listen(8080);