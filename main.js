const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
const publicDirectoryPath = path.join(__dirname, '/public');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(publicDirectoryPath));

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +  '\n', (err) => {
        if(err) {
            console.log('Unable to append to  server.log');
        } 
    });
    
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('upperCase', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        Message: 'Welcome to Home Page!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to Request Handle.'
    });
});

app.listen(3000, () => {
    console.log('Server is Running at Port 3000');
});