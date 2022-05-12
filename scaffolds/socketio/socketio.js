const io = require('socket.io');

exports.scaffold_socketIo = (globalConfigs, webserverApp) => {
    return io(webserverApp);
};