'use strict';
const express = require('express');
const handlebars = require('express-handlebars');
const Employee = require('./models/Employee.js');
const { request, response } = require('express');

const app = express();
app.set('port', 3000);
app.listen(app.get('port'), () => console.log('Express server started'));

app.engine('handlebars', handlebars({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));

app.get('/detail', (request, response) => {
    const name = request.query.employee;
    Employee.findOne({name}).lean()
            .exec((err, employee) => {
                if(err) return console.log(err);
                console.log(employee);
                response.render('details', {employee});
            });
});

app.get('/delete', (request, response) => {
    const id = request.query.id;
    Employee.findByIdAndDelete(id).lean()
            .exec((err, employee) => {
                if(err){
                    return console.log(err);
                } else if(employee === null) {
                    response.send(`Employee with ${id} id does not exist. Cannot delete.`);
                } else {
                    response.send(`${employee.name} was deleted`);
                }
            });
});

app.get('/about', (request, response) => {
    response.type('text/html');
    response.render('about');
});

app.get('/', (request, response) => {
    Employee.find({}).lean()
            .exec((err, employees) => {
                if(err) return console.log(err);
                response.render('home', {employees});
            });
});

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>');
});