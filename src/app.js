const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
const maps = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engines
app.set('view engine', 'hbs')
app.set('views', viewsPath);


// Setting up partials for template header
let partialsFileName = fs.readdirSync(partialsPath);
partialsFileName.forEach((filename) => {
    let matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
        return;
    }
    let partialName = matches[1];
    let partialTemplate = fs.readFileSync(
        partialsPath + "/" + filename,
        "utf-8"
    );
    hbs.registerPartial(partialName, partialTemplate);
})

// setups static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'anurag'
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        res.send({
            error: 'you must provide a search term'
        })
        return
    }
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: 'ANURAG'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address to get weather of location'
        })
    }

    maps.geocode(req.query.address, (error, {latitude, longitude,location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }

        forecast.forecast(latitude,longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData.summary
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page not found general',
        error: 'Page not found for general extension'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Page not found for help',
        error: 'Page not found for help extension'
    })
})



app.listen(3000, () => {
    console.log('server has started on port 3000')
})