module.exports = () => {

    const express = require( 'express' );
    const router = express.Router();

    router.use( (req, res, next) => {

        if (req.globalEnvironment.diagRoutesEnabled === false) {
            res.send('disabled')
            return
        }

        next();

    });

    router.get('/test', (req, res) => {
        res.send('Test Landing Page')
    })

    return router;

}