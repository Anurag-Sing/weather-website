const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/523615eb3710ee880bfec94623e3cd35/'+latitude+','+longitude
    request(url, {json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service', undefined)
        } else if(body.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, body.currently)
        }
    })
}

module.exports = {
    forecast: forecast
}