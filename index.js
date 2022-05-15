const environment = require('./scaffolds/environment/environment');
const webserver = require('./scaffolds/webserver/webserver');
const socketIoServer = require('./scaffolds/socketio/socketio');
const Logger = require('./scaffolds/environment/services/loggerService');
const routes = {
    diag: require('./scaffolds/webserver/routes/diag')
};



module.exports = (envFileLocation) => {
    
    let globalEnvironment = environment.scaffold_env(envFileLocation);
    let serverWebApp = webserver.scaffold_webserver(globalEnvironment);
    let socketIoApp = socketIoServer.scaffold_socketIo(globalEnvironment, serverWebApp.server);
    
    serverWebApp.app.use('/diag', routes.diag());

    return {
        "globalEnvironment": globalEnvironment,
        "serverApp": serverWebApp.app,
        "socketIoApp": socketIoApp,
        "logger": Logger(globalEnvironment)
    };

};
