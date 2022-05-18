const fetch = require('node-fetch');

exports.getAzureAuthToken = async (tenant, secret, clientId) => {

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('scope','https://graph.microsoft.com/.default');
    params.append('client_secret', secret);
    params.append('grant_type', 'client_credentials');

    let tokenGeneratorUrl = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`

    let response = await fetch(tokenGeneratorUrl, {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    })

    let data = await response.json();

    return data

}