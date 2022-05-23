const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const middleware = {
    authHandler: require('./middlewares/authorization')
};

exports.scaffold_webserver = (hostname, webProtocol, port, httpsCertPath, httpsKeyPath) => {

    let app = express();
    let baseServer = false;
    let Server = false;

    switch (webProtocol) {

        case "http": {
            baseServer = require('http');
            Server = baseServer.createServer(app);
            Server.listen(port, () => {
                console.log(`server running at: ${webProtocol}://${hostname}:${port}`);
            });

            break;
        }

        case "https": {
            let sslCertPath = httpsCertPath || "";
            let sslKeyPath = httpsKeyPath || "";

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
            Server.listen(port, () => {
                console.log(`server running at: ${webProtocol}://${hostname}:${port}`);
            });

            break;
        }
    }

    app.use(express.json());
    app.use(cors());
    app.use(middleware.authHandler);

    return {
        app: app,
        server: Server
    };
};
