module.exports = () => {

    const express = require( 'express' );
    const router = express.Router();

    router.use( (req, res, next) => {

        if (process.env.scaffolding.globalEnvironment.diagRoutesEnabled === false) {
            process.env.scaffolding.logger.info('diag route disabled');
            res.send('disabled');
            return;
        };

        next();

    });

    router.get('/test', (req, res) => {
        process.env.scaffolding.logger.info('diag route enabled');
        res.send('Test Landing Page');
    });

    return router;

}