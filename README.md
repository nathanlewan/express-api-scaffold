# express-api-scaffold
### A base environment for creating a RESTful API with expressjs. Supply your routes and the scaffolding will take care of:

 - Setting up the http/https server
 - Setting up the Socket-io server
 - Providing Logging functionality
 - Providing Authentication vi Auth Headers
 - Making .env vars available to your Routes

## example implementation

```
// import module
const scaffold = require('express-api-scaffold');

// define where routes/routers are
const routes = {
    example: require('./examples');
}

// initialize the environment, pointing to the location of your .env file
const scaffolding = scaffold('./.env')

// log out the .env derived environment variables
console.log(scaffolding.globalEnvironment)

// call your route
scaffolding.serverApp.use('/examples', routes.example())

// logging example
scaffolding.logger.info('test')
</code>
```
environment variables can be set using a .env file
- **hostname**: [name of server]
- **port**: [port of server]
- **webProtocol**: [http/https]
- **authEnabled**: [true/false] require auth headers or not
- **authToken**: [bearer key] define your auth token if needed
- **diagRoutesEnabled**: [true/false] enable or disable test /diag url route in module
- **httpsKeyPath**: [path to cert key in pem]
- **httpsCertPath**: [path to cert in pem]
- **logPath**: [path/to/log.log]
