const express = require('express');

exports.scaffold_webserver = (globalConfigs) => {

    let baseServer = false;
    let Server = false;

    switch (globalConfigs.webProtocol) {

        case "http": {

            baseServer = require('http');
            Server = baseServer.createServer(express());
            Server.listen(globalConfigs.port, () => {
                console.log(`server running at: ${globalConfigs.webProtocol}://${globalConfigs.hostname}:${globalConfigs.port}`)
            });

        }
    }

    return Server;
}
