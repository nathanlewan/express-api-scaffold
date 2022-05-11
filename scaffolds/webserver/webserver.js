const express = require('express');
const fs = require('fs');
const path = require('path');
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

            break;
        }

        case "https": {

            let sslCertPath = globalConfigs.httpsCertPath || "";
            let sslKeyPath = globalConfigs.httpsKeyPath || "";

            if ( sslCertPath === "" ) {
                // error no cert file
            } else {
                sslCert = fs.readFileSync( path.join(sslCertPath) );
            };
    
            if ( sslKeyPath === "" ) {
                // error no key path
            } else {
                sslKey = fs.readFileSync( path.join(sslKeyPath) );
            };

            let httpsOptions = {
                key: sslKey,
                cert: sslCert
            };

            baseServer = require( 'https' );
            Server = baseServer.createServer(httpsOptions, app);
            Server.listen(globalConfigs.port, () => {
                console.log(`server running at: ${globalConfigs.webProtocol}://${globalConfigs.hostname}:${globalConfigs.port}`)
            });

            break;
        }
    }

    app.use(express.json());

    app.use(
        (req, res, next) => {
            req.globalEnvironment = globalConfigs
            next()
        }
    )
    
    app.use(middleware.authHandler)

    return {
        app: app,
        server: Server
    }
}
