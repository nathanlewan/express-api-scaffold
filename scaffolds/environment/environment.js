const errHandler = require('../../utils/errorHandler');
const validate = require('fully-typed');
const path = require('path');


const port_schemaValidator = validate({
    type: Number,
    default: 8080,
    min: 1,
    integer: true
});

const hostname_schemaValidator = validate({
    type: String,
    minLength: 1,
    default: 'localhost'
});

const webProtocol_schemaValidator = validate({
    type: String,
    enum: ['http','https'],
    default: 'http'
});

const authEnabled_schemaValidator = validate({
    type: Boolean,
    default: false
});

const authToken_schemaValidator = validate({
    type: String,
    default: "hcc-auth 12345678901234567890",
    min: 20
});

const diagRoutesEnabled_schemaValidator = validate({
    type: Boolean,
    default: false
});

const httpsKeyPath_schemaValidator = validate({
    type: String,
    default: path.join(__dirname, 'certs/key.pem'),
    pattern: /^.*.pem$/i
});

const httpsCertPath_schemaValidator = validate({
    type: String,
    default: path.join(__dirname, 'certs/cert.pem'),
    pattern: /^.*.pem$/i
});

const logPath_schemaValidator = validate({
    type: String,
    default: path.join(__dirname, '../../serverlog.log')
});


exports.envFileValid = (envFileLocation) => {

    try {

        require('dotenv').config({path: path.normalize(envFileLocation)});

        let globalEnvironmentEnvData = {
            hostname: hostname_schemaValidator.normalize(process.env.hostname),
            port: port_schemaValidator.normalize(Number(process.env.port)),
            webProtocol: webProtocol_schemaValidator.normalize(process.env.webProtocol),
            authEnabled: authEnabled_schemaValidator.normalize((process.env.authEnabled === 'true')),
            authToken: authToken_schemaValidator.normalize(process.env.authToken),
            diagRoutesEnabled: diagRoutesEnabled_schemaValidator.normalize((process.env.diagRoutesEnabled === 'true')),
            httpsKeyPath: httpsKeyPath_schemaValidator.normalize(process.env.httpsKeyPath),
            httpsCertPath: httpsCertPath_schemaValidator.normalize(process.env.httpsCertPath),
            logPath: logPath_schemaValidator.normalize(process.env.logPath)
        }

        return globalEnvironmentEnvData;

    } catch (err) {
        errHandler(err);
        return false;
    };

};



exports.scaffold_env = (envFileLocation) => {

    try {

        let validGlobalConfig = this.envFileValid(envFileLocation);

        process.env.logPath = validGlobalConfig.logPath;
        process.env.httpsCertPath = validGlobalConfig.httpsCertPath;
        process.env.httpsKeyPath = validGlobalConfig.httpsKeyPath;
        process.env.diagRoutesEnabled = validGlobalConfig.diagRoutesEnabled;
        process.env.authToken = validGlobalConfig.authToken;
        process.env.authEnabled = validGlobalConfig.authEnabled;
        process.env.webProtocol = validGlobalConfig.webProtocol;
        process.env.port = validGlobalConfig.port;
        process.env.hostname = validGlobalConfig.hostname;
        
        return validGlobalConfig;

    } catch (err) {errHandler(err)};

};