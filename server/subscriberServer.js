var express = require('express');
var bodyParser = require('body-parser');

var subscriberServer = express();
var jsonParser = bodyParser.json();

//********************** */
//subcriber sever
//with two (2) test endpoints
//********************** */

subscriberServer.post('/test1', jsonParser, function(req, res) {
    console.log('Received a post on /test1 endpoint: ' + req.body.message);

    res.send({
        status: 'success',
        endpoint: 'test1'
    });
});

subscriberServer.post('/test2', jsonParser, function(req, res) {
    console.log('Received a post on /test1 endpoint: ' + req.body.message);

    res.send({
        status: 'success',
        endpoint: 'test2'
    });
});

module.exports = subscriberServer;