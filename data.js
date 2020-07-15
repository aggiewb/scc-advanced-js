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
    const employee = employees.find(personObj => personObj.name === name);
    if(employee === undefined){
        return {status: "Employee not found", employee: null};
    }
    employee.salary = employee.salary.toLocaleString();
    return {status: "Employee found", employee};
};

const addEmployee = (name, title, years, salary) => {
    if(getEmployee(name).employee !== null){
        return {status: "Employee already exists"};
    }
    const newEmployee = {name, title, years, salary};
    for(const key in newEmployee){
        if(newEmployee[key] === undefined){
            return {status: "Employee not added due to undefined values passed in"};
        }
    }
    const newEmployeeArrayLength = employees.push(newEmployee);
    return {status: "Employee added", employeeSize: newEmployeeArrayLength};
};

const deleteEmployee = name => {
    const indexOfEmployeeToRemove = employees.findIndex(personObj => personObj.name === name);
    if(indexOfEmployeeToRemove === -1){
        return {status: "Employee not found and unable to delete"};
    }
    employees.splice(indexOfEmployeeToRemove, indexOfEmployeeToRemove + 1);
    return {status: "Employee found and deleted", employeeSize: getAll().length};
}

module.exports = { getAll, getEmployee, addEmployee, deleteEmployee }; 