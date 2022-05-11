const errHandler = require('../../utils/errorHandler');
const validate = require('fully-typed');


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



exports.envFileValid = (envFileLocation) => {

    try {

        require('dotenv').config(envFileLocation);

        let globalEnvironmentEnvData = {
            hostname: hostname_schemaValidator.normalize(process.env.hostname),
            port: port_schemaValidator.normalize(process.env.port),
            webProtocol: webProtocol_schemaValidator.normalize(process.env.webProtocol)
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