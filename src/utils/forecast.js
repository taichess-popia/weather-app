const request = require('request')

const forecast = ({longitude, latitude}, callback) => {
    //const url = 'https://api.darksky.net/forecast/1e929411f0c28e25673da9e5295dfc26/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    const url = 'http://api.weatherstack.com/current?access_key=9900e9e78c67cfc17f89a96c35ad8ba6&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Forecast: Unable to connect', undefined)
        } else if (response.body.error) {
            callback('Forecast: Unable to find location', undefined)
        } else {
         //callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is ' + response.body.currently.precipProbability + '% chance of rain.')
         callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out' + '. The humidity is ' + response.body.current.humidity + '.')
        }
    })
}
    

module.exports = forecast