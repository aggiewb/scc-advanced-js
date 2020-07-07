'use strict'
const express = require('express');
const handlebars = require('express-handlebars');
const data = require('./data.js');

const app = express();
app.set('port', 3000);
app.engine('handlebars', handlebars({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.listen(app.get('port'));

app.get('/about', (request, response) => {
    response.type('text/html');
    response.send('About page');
});

app.get('/', (request, response) => {
    response.render('home', {employees: data()});
});

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('404 - Not found');
});