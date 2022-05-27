const pino = require('pino');
const path = require('path');
const errHandler = require('../../../utils/errorHandler');

module.exports = (logPath) => {
    try {
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
    } catch (err) {
        errHandler(err);
        return pino()
    };
};