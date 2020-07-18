const assert = require('chai').assert;
const data = require('../data.js');

describe('Calling data.getEmployee()', () => {
    describe('Passing in a defined employee', () => {
        it('Should return an existing employee object when called', () => {
            const response = data.getEmployee('Aggie');
            assert.isNotNull(response.employee);
            assert.strictEqual(response.status, 'Employee found');
        });
    });
    describe('Passing in an undefined employee', () => {
        it('Should return null when called', () => {
            const response = data.getEmployee('Rob');
            assert.isNull(response.employee);
            assert.strictEqual(response.status, 'Employee not found');
        });
    });
});

describe('Calling data.addEmployee()', () => {
    describe('Passing in all valid parameters', () => {
        it('Should add a new employee, return status "Employee added" and new size of all employees', () => {
            const employeeAdded = data.addEmployee('John', 'test dev', 1, 500);
            assert.strictEqual(employeeAdded.status, 'Employee added');
            assert.lengthOf(data.getAll(), employeeAdded.employeeSize);
        });
    });
    describe('Passing in all valid parameters but employee already exists', () => {
        it('Should return with status of "Employee already exists"', () => {
            assert.strictEqual(data.addEmployee('Aggie','test dev', 1, 500).status, 'Employee already exists');
        });
    });
    describe('Passing in some valid parameters', () => {
        it('Should return with status of "Employee not added due to undefined values passed in"', () => {
            assert.strictEqual(data.addEmployee('Rob', 'test dev').status, 'Employee not added due to undefined values passed in');
        });
    });
});

describe('Calling data.deleteEmployee()', () => {
    describe('Passing in defined employee', () => {
        it('Should delete employee, return status "Employee found and deleted" and new size of all employees', () => {
            const employeeDeleted = data.deleteEmployee('Aggie');
            assert.strictEqual(employeeDeleted.status, "Employee found and deleted");
            assert.lengthOf(data.getAll(), employeeDeleted.employeeSize);
        });
    });
    describe('Passing in undefined employee', () => {
        it('Should return with a status of "Employee not found and unable to delete"', () => {
            assert.strictEqual(data.deleteEmployee('Rob').status, "Employee not found and unable to delete");
        });
    });
});