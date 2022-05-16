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

    let logger = Logger(process.env.scaffolding.globalEnvironment.logPath);
    process.env.scaffolding.logger = logger

    let serverWebApp = webserver.scaffold_webserver(
        process.env.scaffolding.globalEnvironment.hostname,
        process.env.scaffolding.globalEnvironment.webProtocol,
        process.env.scaffolding.globalEnvironment.port,
        process.env.scaffolding.globalEnvironment.httpsCertPath,
        process.env.scaffolding.globalEnvironment.httpsKeyPath
    );
    process.env.scaffolding.webServer = serverWebApp.server;
    process.env.scaffolding.webApp = serverWebApp.app;

    let socketIoApp = socketIoServer.scaffold_socketIo(process.env.scaffolding.webServer);
    process.env.scaffolding.socketIoApp = socketIoApp;

    process.env.scaffolding.webApp.use('/diag', routes.diag());

};
