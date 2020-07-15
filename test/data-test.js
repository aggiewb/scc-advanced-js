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