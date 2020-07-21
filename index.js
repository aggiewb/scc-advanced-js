'use strict';
const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv').config();
const data = require('./data.js');

const app = express();
app.set('port', 3000);
app.listen(app.get('port'), () => console.log('Express server started'));

mongoose.connect(process.env.CONNECTION_STRING_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', () => console.log('Mongoose connected'));

app.engine('handlebars', handlebars({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));

app.get('/detail', (request, response) => {
    const name = request.query.employee;
    response.render('details', {employee: name, details: data.getEmployee(name).employee});
});

app.get('/about', (request, response) => {
    response.type('text/html');
    response.render('about');
});

app.get('/', (request, response) => {
    response.render('home', {employees: data.getAll()});
});

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>');
});