const pino = require('pino');

module.exports = (globalConfigs) => {
    return pino(
    {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: false,
                levelFirst: true,
                ignore: 'hostname,pid',
                translateTime: 'SYS:yyyy-dd-mm, h:MM:ss TT Z',
                destination: (globalConfigs.logPath)
            }
        }
    }); 
};