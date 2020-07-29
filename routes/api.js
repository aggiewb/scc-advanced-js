const express = require('express');
const Employee = require('../models/Employee.js');
const router = express.Router();

//GET route for a single employee
router.get('/api/employee/:id', (request, response) => {
    const id = request.params.id;
    Employee.findById(id).lean()
            .then((employee) => {
                response.json({employee});
            })
            .catch(() => response.status(500).send('Error occurred: database error.'));
});

//GET route for all employees
router.get('/api/employees', (request, response) => {
    Employee.find({}).lean()
                     .then((employee) => {
                         response.json({employee});
                        })
                     .catch(() => response.status(500).send('Error occurred: database error.'));
});

//DELETE route for deleting an employee

//POST route for adding or updating an employee
router.post('/api/employee', (request, response) => {
    //Body parser is always making an request.body object
    if(!Object.keys(request.body).length){
        return response.status(400).send('Request body is missing');
    }

    if(!request.body.name){
        return response.status(400).send('Required name field is missing');
    }

    Employee.findById(request.body._id)
            .then(employee => {
                if(!employee){
                    employee = new Employee(request.body);
                } else {
                    for(const key in request.body){
                        employee[key] = request.body[key];
                    }
                }
                return employee.save();
            })
            .then(employee => {
                response.status(200).json(employee);
            })
            .catch(err => response.status(500).json(err.message));
});

module.exports = router;