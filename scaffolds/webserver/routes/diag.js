module.exports = () => {

    const express = require( 'express' );
    const router = express.Router();

    router.use( (req, res, next) => {

        if (global.Scaffold.globalEnvironment.diagRoutesEnabled === false) {
            global.Scaffold.logger.info('diag route disabled');
            res.send('disabled');
            return;
        };

        next();

    });

    router.get('/test', (req, res) => {
        global.Scaffold.logger.info('diag route enabled');
        res.send('Test Landing Page');
    });

    return router;

}