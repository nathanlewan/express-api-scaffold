const isAuthorized = require('../../../utils/checker').isAuthorized;
const errHandler = require('../../../utils/errorHandler');

module.exports = async (req, res, next) => {
    try {
        if (global.Scaffold.globalEnvironment.authEnabled === false) {

            next();
            return;

        };

        let authPassed = await isAuthorized(global.Scaffold.globalEnvironment.authEnabled, req.headers.authorization, global.Scaffold.globalEnvironment.authToken);

        if (authPassed) {
            next();
            return;
        } else {
            global.Scaffold.logger.error(`!! Failed authorization attempt from ${req.ip} !!`);
            res.send('not authorized');
            return;
        };
    } catch (err) {
        errHandler(err);
        res.send('error: not authorized');
    }

};