const io = require('socket.io');

exports.scaffold_socketIo = (webserverApp) => {
    return io(webserverApp);
};