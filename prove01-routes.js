const SUsers = ['User 1', 'User 2'];
const requestHandler = (req, res) => {
    const url = req.url;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send!</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write('<body>');
        res.write('<a href="./">Return</a>');
        res.write('<ul>');
        for (const user of SUsers) {
            res.write(`<li>${user}</li>`);
        }
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
            //console.log(parsedBody);
            const NewUser = parsedBody.split('=')[1];
            SUsers.push(NewUser);
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            res.end();
        });
        //Restore    
        //res.statusCode = 302;
        //    res.setHeader('Location', '/');
        //    res.end();
    }
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestHandler;