const request = require('request');

const forcast = (lat, lng, callback) => {
    const latlng = lat+','+lng;
    const url = 'https://api.darksky.net/forecast/6dee98ae966d8deb07c7df9b4afe51be/'+encodeURIComponent(latlng)+'?units=si';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location!', undefined);
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree out. There is a ' + body.currently.precipProbability + ' chance of rain')
        }
    })
}

module.exports = forcast;