const environment = require('./scaffolds/environment/environment');
const webserver = require('./scaffolds/webserver/webserver');
const socketIoServer = require('./scaffolds/socketio/socketio');
const Logger = require('./scaffolds/environment/services/loggerService');
const errHandler = require('./utils/errorHandler');

const routes = {
    diag: require('./scaffolds/webserver/routes/diag')
};



module.exports = (envFileLocation) => {
    
    try {
        
        // define global object
        global.Scaffold = {}

        let globalEnvironment = environment.scaffold_env(envFileLocation);
        global.Scaffold.globalEnvironment = globalEnvironment;
        global.Scaffold.projectEnvironment = {};

        let logger = Logger(global.Scaffold.globalEnvironment.logPath);
        global.Scaffold.logger = logger

        let serverWebApp = webserver.scaffold_webserver(
            global.Scaffold.globalEnvironment.hostname,
            global.Scaffold.globalEnvironment.webProtocol,
            global.Scaffold.globalEnvironment.port,
            global.Scaffold.globalEnvironment.httpsCertPath,
            global.Scaffold.globalEnvironment.httpsKeyPath
        );
        global.Scaffold.webServer = serverWebApp.server;
        global.Scaffold.webApp = serverWebApp.app;
        global.Scafford.errorHandler = errHandler;

        let socketIoApp = socketIoServer.scaffold_socketIo(global.Scaffold.webServer);
        global.Scaffold.socketIoApp = socketIoApp;

        global.Scaffold.webApp.use('/diag', routes.diag());

    } catch (err) {
        errHandler(err);
    }

};
