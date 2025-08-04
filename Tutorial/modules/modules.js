// Modules
const names = require(`./name`);
const sayHi = require(`./util`);
const data = require('./alternative-export');

console.log(data);
console.log(names);

sayHi('Susan');
sayHi(names.john);
sayHi(names.peter);