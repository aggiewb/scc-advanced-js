const data = require('./data.js');
const http = require('http');

http.createServer((request, response) => {
    const greeting = '<h1>Hi, my name is Aggie, and this is my first Node.js app!</h1>';
    const appDescription = '<p>Here, I\'ve imported a custom Node module that contains a function that returns an array of objects.</p>';
    const objectDescription = `<p>Total items in my data array is ${data().length}.</p><p>This is the contents of the array:</p>`;
    const employeesListContents = data().map(employee => `<li>${JSON.stringify(employee)}</li>`);
    let aboutAuthor = '<h1>About me</h1><p>Let me tell you a little about myself! ';
    aboutAuthor += 'I am working towards a web development certificate from Seattle Central College, and I currently live in Seattle with my husband. ';
    aboutAuthor += 'I have experience in HTML, CSS, Python, JS, SQL, PHP, Django, and Java. In my off time, ';
    aboutAuthor += 'I really enjoy reading, being outside, and playing video/board games.<p>';
    const error404 = '<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>';

    const path = request.url.toLowerCase();

    if(path === '/'){
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write(`${greeting}${appDescription}`);
        response.write(objectDescription);
        response.write(`<ul>${employeesListContents.join('')}</ul>`);
    } else if(path === '/about'){
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write(aboutAuthor);
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write(error404);
    }
    response.end();
}).listen(3000);