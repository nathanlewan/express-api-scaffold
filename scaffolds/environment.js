const errHandler = require('../utils/errorHandler');
const validate = require('critiq');


exports.envFileValid = (envFileLocation) => {

    let payload = ""
       
    let config = {
    
        hostname:['string','required'],
        port:['integer','min-3', 'required'],
        webProtocol: ['string','min-4','max-5', 'required']
        
    }
    
    validate.validate(config, payload, function(err,result){
        
        if(err){
            console.log(err);
            return
        }
        console.log('Hooray! Everything is validated')
        console.log(result)
        
    })
}



exports.scaffold_env = (envFileLocation) => {

    try {

        if (this.envFileValid(envFileLocation)) {
            require('dotenv').config(envFileLocation);
        }
        
        return {
            "hostname": process.env.hostname,
            "port": process.env.port,
            "webProtocol": process.env.webProtocol
        }
        
    } catch (err) {errHandler(err)}

}