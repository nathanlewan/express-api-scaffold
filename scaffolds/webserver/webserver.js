const express = require('express');
const middleware = {
    authHandler: require('./middlewares/authorization')
}

exports.scaffold_webserver = (globalConfigs) => {

    let app = express()
    let baseServer = false;
    let Server = false;

    switch (globalConfigs.webProtocol) {

        case "http": {
            baseServer = require('http');
            Server = baseServer.createServer(app);
            Server.listen(globalConfigs.port, () => {
                console.log(`server running at: ${globalConfigs.webProtocol}://${globalConfigs.hostname}:${globalConfigs.port}`)
            });

        }
    }



    return {
        app: app,
        server: Server
    }
}
