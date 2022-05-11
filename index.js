const environment = require('./scaffolds/environment/environment');
const webserver = require('./scaffolds/webserver/webserver');
const socketIoServer = require('./scaffolds/socketio/socketio');



module.exports = (envFileLocation) => {
    
    let globalEnvironment = environment.scaffold_env(envFileLocation);
    let serverWebApp = webserver.scaffold_webserver(globalEnvironment);
    let socketIoApp = socketIoServer.scaffold_socketIo(globalEnvironment, serverWebApp);

    return {
        "globalEnvironment": globalEnvironment,
        "serverApp": serverWebApp,
        "socketIoApp": socketIoApp
    }

}
