const { readFile, writeFile } = require('fs').promises

// Async patterns: Node's native option
// use built in module 'util' to return a promise
// const util = require('util');
// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);


// wrapper function
// uses a promise to simplify the nested code in '3-built-in-modules.js' to read files
// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf8', (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// };

const start = async () => {
    try {
        const first = await readFile('./content/first.txt', 'utf8');
        const second = await readFile('./content/second.txt', 'utf8');

        await writeFile('./content/result-mind-grenade.txt', `THIS IS AWESOME : ${first} ${second}`);
        console.log(first, second);
    } catch (error) {
        console.log(error);
    }
};

start();