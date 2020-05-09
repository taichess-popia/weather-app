const request = require('request')

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGFpY2hlc3MiLCJhIjoiY2s2b3l4Y2txMWM4czN2cnJmdHU5aTBrMSJ9.n7LK_f-WHz1id84OCXxndw&limit=1'
    request({url: geocodeUrl, json: true}, (error, response) => {
        if (error) {
            callback('Geocode: Unable to connect to geolocation services.', undefined)
        } else if (response.body.features.length === 0) {
            callback('Geocode: Unable to find geolocation', undefined)
        } else {
              callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode