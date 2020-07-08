const employees = [
    {
        name: 'Aggie',
        title: 'Web Dev 1',
        years: 2,
        salary: 80000
    }, 
    {
        name: 'Steven',
        title: 'Web Dev Intern',
        years: 5,
        salary: 5000
    }, 
    {
        name: 'Sherman',
        title: 'Web Dev 2',
        years: 3,
        salary: 90000
    }, 
    {
        name: 'Evelynn',
        title: 'Senior Developer',
        years: 8,
        salary: 200000
    }, 
    {
        name: 'Frank',
        title: 'QA Engineer',
        years: 2,
        salary: 70000
    },
    {
        name: 'Michelle',
        title: 'Project Manager',
        years: 2,
        salary: 90000
    }
];

const getAll = () => employees;

const getEmployee = name => {
    let employee = employees.find(personObj => personObj.name === name);
    employee.salary = employee.salary.toLocaleString();
    return employee;
}

module.exports = { getAll, getEmployee }; 