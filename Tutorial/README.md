[Youtube video](https://www.youtube.com/watch?v=Oe421EPjeBE)

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