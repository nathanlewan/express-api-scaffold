const isAuthorized = require('../../../utils/checker').isAuthorized;

module.exports = async (req, res, next) => {

    if (process.env.globalEnvironment.authEnabled === false) {

        next();
        return;

    };

    let authPassed = await isAuthorized(process.env.globalEnvironment.authEnabled, req.headers.authorization, process.env.globalEnvironment.authToken);

    if (authPassed) {
        next();
        return;
    } else {
        process.env.logger.info('failed authorization attempt');
        res.send('not authorized');
        return;
    };

};