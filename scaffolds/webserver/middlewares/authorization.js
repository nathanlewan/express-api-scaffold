const isAuthorized = require('../../../utils/checker').isAuthorized;

module.exports = async (req, res, next) => {

    if (process.env.scaffolding.globalEnvironment.authEnabled === false) {

        next();
        return;

    };

    let authPassed = await isAuthorized(process.env.scaffolding.globalEnvironment.authEnabled, req.headers.authorization, process.env.scaffolding.globalEnvironment.authToken);

    if (authPassed) {
        next();
        return;
    } else {
        process.env.scaffolding.logger.info('failed authorization attempt');
        res.send('not authorized');
        return;
    };

};