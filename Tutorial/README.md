[Youtube video](https://www.youtube.com/watch?v=Oe421EPjeBE)

[Github link](https://github.com/john-smilga/node-express-course)

**How to export/import modules**:
- export
    ```js
    module.exports = {x, y};
    module.exports = func;
    ```
- import
    ```js
    const var = require('./path')
    ```

**Custom commands in Node**
- run commands [set up in package.json]:
    - npm start (runs app.js)
    - npm run dev (runs nodemon with app.js to allow realtime updates)

**Async patterns**
- node native option:
    - option 1: use util, use promisfy
        ```js
        const util = require('util');
        const readFilePromise = util.promisify(readFile);
        
        // ...
        
        const first = await readFilePromise('./content/first.txt', 'utf8');
        ```
    - option 2: use promises when importing
        ```js
        const { readFile } = require('fs').promises;
        ```

**Event-driven programming**
- class:
    ```js
    const EventEmitter = require('events');
    
    // create instance of class
    const customEmitter = new EventEmitter();

    customEmitter.on('response', () => { // listen for event 'response'
        console.log(`data recieved`);
    });
    customEmitter.emit('response'); // emit event 'response'
    ```

**API, SSR**
- mostly use express.js for api or server side rendering
- api: setting up a http interface to interact with data
    - data is send using json
- SSR: set up template and send back entire javascript/css/html

**Middleware**
- req => middleware => res
- reusable function that prevent dulicating code between routes
- must pass to next middleware or terminate with 'res.send'
- call in route
    ```js
    app.get('/', logger, (req, res) => {
        //...
    });
    app.get('/', [logger, authorize], (req, res) => {
        //...
    });
    ```
- add middleware to every route
    ```js
    app.use(logger);
    app.use([logger, authorize]); // add multiple middlewares
    ```
- add middleware to some path (work for any route after 'api': /api/product and /api/item)
    ```js
    app.use('api', logger);
    ```

**built-in middleware**
- parse data:
    ```js
    // parse from data
    app.use(express.urlencoded({ extended: false }));
    //parse json
    app.use(express.json());
    ```

**Postman**
- test code without having to build a whole frontend
    