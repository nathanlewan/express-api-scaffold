const environment = require('./scaffolds/environment/environment');
const webserver = require('./scaffolds/webserver/webserver');
const socketIoServer = require('./scaffolds/socketio/socketio');
const Logger = require('./scaffolds/environment/services/loggerService');

const routes = {
    diag: require('./scaffolds/webserver/routes/diag')
};



module.exports = (envFileLocation) => {
    
    process.env.scaffolding = {};

    let globalEnvironment = environment.scaffold_env(envFileLocation);
    process.env.scaffolding.globalEnvironment = globalEnvironment;
    process.env.scaffolding.projectEnvironment = {};

    let logger = Logger(process.env.globalEnvironment.logPath);
    process.env.scaffolding.logger = logger

    let serverWebApp = webserver.scaffold_webserver(
        process.env.globalEnvironment.hostname,
        process.env.globalEnvironment.webProtocol,
        process.env.globalEnvironment.port,
        process.env.globalEnvironment.httpsCertPath,
        process.env.globalEnvironment.httpsKeyPath
    );
    process.env.scaffolding.webServer = serverWebApp.server;
    process.env.scaffolding.webApp = serverWebApp.app;

    let socketIoApp = socketIoServer.scaffold_socketIo(process.env.scaffolding.webServer);
    process.env.scaffolding.socketIoApp = socketIoApp;

    serverWebApp.app.use('/diag', routes.diag());

};
