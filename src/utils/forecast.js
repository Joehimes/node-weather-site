const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f426a65c945719eb10dea0cc22c0d7ce&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            console.log(body);
            const temperature = body.current.temperature;
            const feelsLike = body.current.feelslike;
            const sky = body.current.weather_descriptions[0];
            const humidity = body.current.humidity;
            callback(undefined, `${sky}. It is currently ${temperature} degrees. It feels like ${feelsLike} degrees. The humidity is ${humidity}%.`)
        }
    })
}

module.exports = forecast;