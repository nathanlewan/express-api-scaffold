const environment = require('./scaffolds/environment/environment');
const webserver = require('./scaffolds/webserver/webserver');
const socketIoServer = require('./scaffolds/socketio/socketio');



module.exports = (envFileLocation) => {
    
    let globalEnvironment = environment.scaffold_env(envFileLocation);
    let serverWebApp = webserver.scaffold_webserver(globalEnvironment);
    let socketIoApp = socketIoServer.scaffold_socketIo(globalEnvironment, serverWebApp.server);

    serverWebApp.app.get('/', (req, res) => {
        res.send('Test Landing Page')
    })
    
    return {
        "globalEnvironment": globalEnvironment,
        "serverApp": serverWebApp.app,
        "socketIoApp": socketIoApp
    }

}
