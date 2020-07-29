const express = require('express');
const Employee = require('../models/Employee.js')
const router = express.Router();

//GET route for a single employee
router.get('/api/employee/:name', (request, response) => {
    const name = request.params.name;
    Employee.findOne({name}).lean()
            .then((employee) => {
                response.json({name: employee.name, title: employee.title, salary: employee.salary, years: employee.years});
            })
            .catch(err => response.status(500).send('Error occurred: database error.'));
});

//GET route for all employees
router.get('/api/employees', (request, response) => {
    Employee.find({}).lean()
            .then((employees) => {
                    response.json(employees.map(employee => { 
                        return {name: employee.name, title: employee.title, salary: employee.salary, years: employee.years};
                    }));
            })
            .catch(err => response.status(500).send('Error occurred: database error.'));
});

//DELETE route for deleting an employee

//POST route for adding or updating an employee

module.exports = router;