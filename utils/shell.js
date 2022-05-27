const exec = require('child_process').exec;
const path = require('path')
const logger = require ('../scaffolds/environment/services/loggerService')(global.Scaffold.globalEnvironment.logPath);
const errHandler = require('./errorHandler');


exports.linuxShell = (scriptPath, scriptName) => {

    return new Promise((resolve, reject) => {

        try {
            logger.info(`[linux_shell]: running ${scriptName}/${scriptPath}`);
            const myShellScript = exec( path.join( __dirname, `${scriptPath}`, `${scriptName}`), (error, stdout, stderr) => {

                if (error) { errHandler(err); resolve(error.message) };
                if (stderr) { errHandler(stderr); resolve(stderr) };

                resolve(stdout);

            });
        } catch (err) {
            errHandler(err);
            resolve(err);
        }

    });

};

exports.powerShell = (scriptPath, scriptName, scriptArgs) => {

    return new Promise((resolve, reject) => {

        try {
            let fullPath;

            if (scriptArgs) {
                fullPath = `pwsh.LNK "${scriptPath}\\${scriptName}" ${scriptArgs}`
            } else {
                fullPath = `pwsh.LNK "${scriptPath}\\${scriptName}"`
            }

            const myShellScript = exec( fullPath, (error, stdout, stderr) => {

                if (error) { errHandler(error); resolve(error.message) };
                if (stderr) { errHandler(stderr); resolve(stderr) };

                resolve(stdout);

            });
        } catch (err) {
            errHandler(err);
            resolve(err);
        }

    });

};