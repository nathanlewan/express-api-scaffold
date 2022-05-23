const exec = require('child_process').exec;
const path = require('path')
const logger = require ('../scaffolds/environment/services/loggerService')(global.Scaffold.globalEnvironment.logPath);


exports.linuxShell = (scriptPath, scriptName) => {

    return new Promise((resolve, reject) => {
        logger.info(`[linux_shell]: running ${scriptName}/${scriptPath}`);
        const myShellScript = exec( path.join( __dirname, `${scriptPath}`, `${scriptName}`), (error, stdout, stderr) => {

            if (error) { resolve(error.message) };
            if (stderr) { resolve(stderr) };

            resolve(stdout);

        });

    });

};

exports.powerShell = (scriptPath, scriptName, scriptArgs) => {

    return new Promise((resolve, reject) => {

        let fullPath;

        if (scriptArgs) {
            fullPath = `pwsh.LNK "${scriptPath}\\${scriptName}" ${scriptArgs}`
        } else {
            fullPath = `pwsh.LNK "${scriptPath}\\${scriptName}"`
        }

        const myShellScript = exec( fullPath, (error, stdout, stderr) => {

            if (error) { resolve(error.message) };
            if (stderr) { resolve(stderr) };

            resolve(stdout);

        });

    });

};