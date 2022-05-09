const environment = require('./scaffolds/environment');
const webserver = require('./scaffolds/webserver');
const socketIoServer = require('./scaffolds/socketio');



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
