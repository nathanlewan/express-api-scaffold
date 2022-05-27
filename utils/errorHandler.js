module.exports = (err, data) => {
    try {
        if (err) {
            if (err.message) {
                console.log(err.message);
            } else {
                console.log(err);
            }
        }
    } catch (error) {
        console.log(error.message)
    }
        
};