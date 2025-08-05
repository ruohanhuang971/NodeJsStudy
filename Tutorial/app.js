const { createReadStream } = require('fs');

// use stream to read in big files
const stream = createReadStream('./content/first.txt');

stream.on('data', (result) => {
    console.log(result)
});