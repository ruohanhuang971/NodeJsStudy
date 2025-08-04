/*
    Built in modules: OS, path, filesystem, HTTP
*/

// built in os module
const os = require('os');

// info about current user
const user = os.userInfo();
console.log(user);

// method returns system uptime in seconds
console.log(`The system uptime is ${os.uptime()} seconds`);

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMen: os.totalmem(),
    freeMem: os.freemem(),
}
console.log(currentOS);



// built in path module
const path = require('path');

// seperator for the machine
console.log(path.sep);

// join a file path
const filePath = path.join('/content', 'subfolder', 'test.txt');
console.log(filePath);

const base = path.basename(filePath);
console.log(base);

// return absolute path
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolute);



// syncronous file system
const { readFileSync, writeFileSync } = require('fs');

const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');
console.log(first, second);

writeFileSync('./content/result-sync.txt', `Here is the results: ${first}, ${second}`, { flag: 'a' });



// asyncronous file system
const { readFile, writeFile } = require('fs');

// provide path and call back function (function that is executed once it is done)
readFile('./content/first.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }

    const first = result;
    readFile('./content/second.txt', 'utf8', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        const second = result;

        writeFile('./content/result-async.txt', `Here is the results: ${first}, ${second}`,
            { flag: 'a' }, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log(result);
            });
    });
});



// built in HTTP module
const http = require('http');

// req: incoming request, res: response to send back
const server = http.createServer((req, res) => {
    // if request url is homepage
    if (req.url === '/') {
        res.end('Welcome to our home page');
    }

    if (req.url === '/about') {
        res.end('Here is our short history');
    }

    // default response -> called when user access unknow url
    res.end(`
        <h1>Oops</h1>
        <p>We can seem to find the page you are looking for</p>
        <a href='/'>Go to homepage</a>
    `)
});

server.listen(5000);