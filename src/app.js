const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000

//Set up static directory to server
app.use(express.static(path.join(__dirname,'../public'))) //publicDirectoryPath
// Define paths for handlebar views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Set handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Tai Chesselet'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather app About',
        name: 'Tai Chesselet'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather app Help',
        name: 'Tai Chesselet',
        helpText: 'Help Text About the Weather Service',
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address){return res.send({ error : 'You must pass an address'})}
    geocode(req.query.address, (error, data) => {
        if (error) {return res.send ({error})}
        forecast(data, (error, forecastData) => {
            if (error) {return res.send({error})}
            res.send({
                address: data.location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        notFoundMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('notFound', {
        notFoundMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("server is up on port " + port)
})