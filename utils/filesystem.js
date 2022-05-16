const fs = require('fs');
const logger = require('../scaffolds/environment/services/loggerService' )(process.env.scaffolding.globalEnvironment.logPath);

const utils = {
    "checker": require('./checker')
}




exports.getDirContents = (dirPath) => {

    return new Promise( (resolve, reject) => {

        logger.info(`[getDirContents]: getting files in directory: [${dirPath}]`);

        if ( utils.checker.isEmpty(dirPath) === true) {
            logger.error("[getDirContents]: dirPath is empty. it is required");
            resolve([]);
        }
    
        fs.readdir(dirPath, {encoding: 'utf8', withFileTypes: true}, (err, files) => {
            if (err) {
                resolve(err)
            } else {
                resolve({
                    "directoryName": dirPath,
                    "filesArray": files
                })
            }
        })

    })
    
}

exports.getFileContents = (filesObject) => {

    return new Promise ((resolve, reject) => {

        let dirPath = filesObject.directoryName
        let finalData = {};

        filesObject.filesArray.forEach( element => {

            if ( element.isDirectory() === false ) {

                logger.info(`[getFileContents]: getting data from file [${dirPath}/${element.name}]`);

                let data = fs.readFileSync(`${dirPath}/${element.name}`, 'utf8')

                finalData[element.name] = data

            }
                
        })
        
        resolve(finalData)

    })

}

exports.writeFileContents = (fileName, fileData) => {

    return new Promise ((resolve, reject) => {

        logger.info(`[writeFileContents]: writing data to [${fileName}]`);

        fs.writeFile(fileName, fileData, (err) => {
            if (err) {
                resolve(err.message)
            }
            resolve("success")
        })

    })

}
