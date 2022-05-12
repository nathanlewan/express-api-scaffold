const isAuthorized = require('../../../utils/checker').isAuthorized;

module.exports = async (req, res, next) => {

    if (req.globalEnvironment.authEnabled === false) {

        next();
        return;

    };

    let authPassed = await isAuthorized(req.globalEnvironment.authEnabled, req.headers.authorization, req.globalEnvironment.authToken);

    if (authPassed) {
        next();
        return;
    } else {
        req.logger.info('failed authorization attempt');
        res.send('not authorized');
        return;
    };

};