const express = require('express');
const Employee = require('../models/Employee.js');
const router = express.Router();

//GET route for a single employee
router.get('/api/employee/:id', (request, response) => {
    const id = request.params.id;
    Employee.findById(id).lean()
            .then(employee => {
                response.json({employee});
            })
            .catch(err => response.status(500).json({error: err.message}));
});

//GET route for all employees
router.get('/api/employees', (request, response) => {
    Employee.find({}).lean()
                     .then(employee => {
                         response.json({employee});
                        })
                     .catch(err => response.status(500).json({error: err.message}));
});

//DELETE route for deleting an employee
router.delete('/api/employee/:id', (request, response) => {
    const requestId = request.params.id;
    Employee.findById(requestId)
            .then(employee => {
                if(!employee){
                    return response.status(400).send(`Employee with id: ${requestId} does not exist. Deletion unsuccessful.`);
                }
                employee.remove();
                response.status(200).json({employeeDeleted: employee});
            })
            .catch(err => response.status(500).json({error: err.message}));
});

//POST route for adding or updating an employee
router.post('/api/employee', (request, response) => {
    const requestBody = request.body;
    //Body parser is always making an request.body object
    if(!Object.keys(requestBody).length){
        return response.status(400).send('Request body is missing');
    }

    if(!requestBody.name){
        return response.status(400).send('Required name field is missing');
    }

    Employee.findById(requestBody._id)
            .then(employee => {
                if(!employee){
                    employee = new Employee(requestBody);
                } else {
                    for(const key in requestBody){
                        employee[key] = requestBody[key];
                    }
                }
                return employee.save();
            })
            .then(employee => {
                response.status(200).json(employee);
            })
            .catch(err => response.status(500).json({error: err.message}));
});

module.exports = router;