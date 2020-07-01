const data = require('./data.js');
const http = require('http');

http.createServer((request, response) => {
    const greeting = '<h1>Hi, my name is Aggie, and this is my first Node.js app!</h1>';
    const appDescription = '<p>Here, I\'ve imported a custom Node module that contains a function that returns an array of objects.</p>'
    const objectDescription = `<p>Total items in my data array is ${data().length}.</p><p>This is the contents of the array:</p>`
    const employeesListContents = data().map(employee => `<li>${JSON.stringify(employee)}</li>`);

    response.writeHead(200, {'Content-type': 'text/html'});
    response.write(`${greeting}${appDescription}`);
    response.write(objectDescription);
    response.write(`<ul>${employeesListContents.join('')}</ul>`);
    response.end();
}).listen(3000);