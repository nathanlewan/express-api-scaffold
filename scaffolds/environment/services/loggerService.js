const pino = require('pino');
const path = require('path');

module.exports = (logPath) => {
    return pino(
    {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: false,
                levelFirst: true,
                ignore: 'hostname,pid',
                translateTime: 'SYS:yyyy-dd-mm, h:MM:ss TT Z',
                destination: (path.normalize(logPath))
            }
        }
    }); 
};