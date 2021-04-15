require('dotenv').config();
require('./db.js');

var subscriberServer = require('./server/subscriberServer');

var publisherServer = require('./server/publisherServer');

subscriberServer.listen(9000, function(err) {
    console.log('listening on port: ' + 9000);
});

publisherServer.listen(8000, function(err) {
    console.log('listening on port:' + 8000);
});