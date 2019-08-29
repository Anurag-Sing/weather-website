const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://locationiq.com/v1/search_sandbox.php?format=json&q='+address+'&accept-language=en';

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service', undefined)
        } else if(body.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0]['display_name']
            })
        }
    })
}

module.exports = {
    geocode: geocode
}