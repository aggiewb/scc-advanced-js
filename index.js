'use strict';
const express = require('express');
const handlebars = require('express-handlebars');
const data = require('./data.js');

const app = express();
app.set('port', 3000);
app.listen(app.get('port'), () => console.log('Express server started'));

app.engine('handlebars', handlebars({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));

app.get('/detail', (request, response) => {
    let name = request.query.employee;
    response.render('details', {details: data.getEmployee(name)});
});

app.get('/about', (request, response) => {
    response.type('text/html');
    response.send('<h1>About us</h1><p>We\'re a great company making webpages!</p>');
});

app.get('/', (request, response) => {
    response.render('home', {employees: data.getAll()});
});

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>');
});