module.exports = (err, data) => {
    try {
        if (err) {
            if (err.message) {
                console.log(err.message);

                if (global) {
                    if (global.Scaffold) {
                        if (global.Scaffold.logger) {
                            global.Scaffold.logger.error(err.message)
                        }
                    }
                    
                }

            } else {
                console.log(err);

                if (global) {
                    if (global.Scaffold) {
                        if (global.Scaffold.logger) {
                            global.Scaffold.logger.error(err)
                        }
                    }
                    
                }

            }
        }
    } catch (error) {
        console.log(error.message)
        if (global) {
            if (global.Scaffold) {
                if (global.Scaffold.logger) {
                    global.Scaffold.logger.error(error.message)
                }
            }
            
        }
    }
        
};