'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const Employee = require('./models/Employee.js');
const apiRoute = require('./routes/api.js');
const app = express();

app.use(bodyParser.json());
app.use(apiRoute);
app.use('/api', require('cors')());

app.set('port', 3000);
app.listen(app.get('port'), () => console.log('Express server started'));

app.engine('handlebars', handlebars({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));

app.get('/detail', (request, response) => {
    const name = request.query.employee;
    Employee.findOne({name}).lean()
            .exec((err, employee) => {
                if(err){
                    response.send(500, {message: 'Server error. Employee request unsuccessful'});
                }
                response.render('details', {employee});
            });
});

app.get('/delete', (request, response) => {
    const id = request.query.id;
    Employee.findByIdAndDelete(id).lean()
            .exec((err, employee) => {
                if(err){
                    response.send(500, {message: 'Server error. Deletion unsuccessful'});
                } else if(!employee) {
                    response.send(`Employee with id: ${id} does not exist. Deletion unsuccessful.`);
                } else {
                    response.send(`Deletion of ${employee.name} with id: ${id} was successful.`);
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
                if(err){
                    response.send(500, {message: 'Server error. Employee request unsuccessful.'});
                }
                // Either handlebars or React is parsing the employees string passed in
                // It only correctly parses in the handlebars file with triple stash
                response.render('index', {employees: JSON.stringify(employees)});
            });
});

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>');
});