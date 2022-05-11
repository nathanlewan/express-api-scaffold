const errHandler = require('../../utils/errorHandler');
const validate = require('fully-typed');
const path = require('path');


const port_schemaValidator = validate({
    type: Number,
    default: 8080,
    min: 1,
    integer: true
})

const hostname_schemaValidator = validate({
    type: String,
    minLength: 1,
    default: 'localhost'
})

const webProtocol_schemaValidator = validate({
    type: String,
    enum: ['http','https'],
    default: 'http'
})

const authEnabled_schemaValidator = validate({
    type: Boolean,
    default: false
})

const authToken_schemaValidator = validate({
    type: String,
    default: "hcc-auth 12345678901234567890",
    min: 20
})

const diagRoutesEnabled_schemaValidator = validate({
    type: Boolean,
    default: false
})

const httpsKeyPath_schemaValidator = validate({
    type: String,
    default: path.join(__dirname, 'certs/key.pem'),
    pattern: /^.*[a-z].*.pem$/i
})

const httpsCertPath_schemaValidator = validate({
    type: String,
    default:  path.join(__dirname, 'certs/cert.pem'),
    pattern: /^.*[a-z].*.pem$/i
})


exports.envFileValid = (envFileLocation) => {

    try {

        require('dotenv').config(envFileLocation);

        let globalEnvironmentEnvData = {
            hostname: hostname_schemaValidator.normalize(process.env.hostname),
            port: port_schemaValidator.normalize(process.env.port),
            webProtocol: webProtocol_schemaValidator.normalize(process.env.webProtocol),
            authEnabled: authEnabled_schemaValidator.normalize((process.env.authEnabled === 'true')),
            authToken: authToken_schemaValidator.normalize(process.env.authToken),
            diagRoutesEnabled: diagRoutesEnabled_schemaValidator.normalize((process.env.diagRoutesEnabled === 'true')),
            httpsKeyPath: httpsKeyPath_schemaValidator.normalize(process.env.httpsKeyPath),
            httpsCertPath: httpsCertPath_schemaValidator.normalize(process.env.httpsCertPath)
        }

        return globalEnvironmentEnvData

    } catch (err) {
        errHandler(err)
        return false
    }

}



exports.scaffold_env = (envFileLocation) => {

    try {

        let validGlobalConfig = this.envFileValid(envFileLocation)
        return validGlobalConfig
        
    } catch (err) {errHandler(err)}

}