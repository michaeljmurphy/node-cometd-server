const http = require("http");
const cometd = require('cometd-nodejs-server');

var _channel = process.env.channel;
var _port = 80;

/* Create a cometd server and expose it */
const cometdServer = cometd.createCometDServer({
    loglevel : 'debug'
});


const httpServer = http.createServer(cometdServer.handle);
httpServer.listen(_port, function() {
    var port = httpServer.address().port;
    console.log('listening on localhost:' + port);
    _uri = 'http://localhost:' + port + '/cometd';
});

/* Create a channel with the same name as the
   channel we created on SF */
const cometDChannel = cometdServer.createServerChannel(_channel);
console.dir(cometDChannel);
console.dir(cometDChannel.publish);


function listenToChannel() {
    console.log('listenToChannel()');

    cometDChannel.addListener('message', function(session, _channel, message, callback) {
        // Your message handling here.
        console.log('*** CometD Listener');
        console.dir(message);


        // Invoke the callback to signal that handling is complete.
        callback();
    });
}





