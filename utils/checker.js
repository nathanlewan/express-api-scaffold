
module.exports.isEmpty = (variableBeingTested) => {

    try {
        if (variableBeingTested === null || variableBeingTested === undefined || variableBeingTested === "") {
            return true
        } else {
            return false
        }
    } catch (err) {
        // if there's an error, assume it's empty
        return true
    }

}

module.exports.isAuthorized = ( isRequired, givenToken, requiredToken ) => {

    if (isRequired === false) {
        return true
    }

    if (givenToken === requiredToken) {
        return true
    } else {
        return false
    }

}