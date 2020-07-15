const assert = require('chai').assert;
const data = require('../data.js');

describe('Calling data.getEmployee()', () => {
    describe('Call with a defined employee', () => {
        it('Should return a defined employee object when called', () => {
            const response = data.getEmployee('Aggie');
            assert.isNotNull(response.employee, 'The employee is null');
            assert.strictEqual(response.status, 'Employee found', 'The employee does not exist');
        });
    });
    describe('Call with an undefined employee', () => {
        it('Should return undefined when called', () => {
            const response = data.getEmployee('Rob');
            assert.isNull(response.employee, 'The employee is not null');
            assert.strictEqual(response.status, 'Employee not found', 'The employee exists');
        });
    });
});

describe('Calling data.addEmployee()', () => {
    describe('Call with all valid parameters', () => {
        it('Should add a new employee', () => {
            assert.strictEqual(data.addEmployee('John', 'test dev', 1, 500).status, 'Employee added');
        });
    });
    describe('Call with all valid parameters but employee already exists', () => {
        it('Should return with status of "Employee already exists"', () => {
            assert.strictEqual(data.addEmployee('Aggie','test dev', 1, 500).status, 'Employee already exists');
        });
    });
    describe('Call with some parameters not passed in', () => {
        it('Should return with status of "Employee not added due to undefined values passed in"', () => {
            assert.strictEqual(data.addEmployee('Rob', 'test dev').status, 'Employee not added due to undefined values passed in');
        });
    });
});