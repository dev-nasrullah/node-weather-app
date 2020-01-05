const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000;

//define path for express config.
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public');
const patialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(patialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Nasrullah'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Nasrullah'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'Nasrullah'
    });
})


app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            err: "address filed in required"
        })
    }

    geocode(address, (err, {latitude, longitude, location} = {}) => {  // callback chaining
        if (err) {
            res.send({err}); // or return here.
        }
        else {
            forcast(latitude, longitude, (err, response) => {
                if (err) {
                    return res.send({err});
                }
                res.send({
                    location,
                    forcast : response,
                    address
                });
            });
        }
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Nasrullah'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 page not found',
        title: '404',
        name: 'Nasrullah'
    })
})

app.listen(port, () => {
    console.log('Server is up on ' + port);
});