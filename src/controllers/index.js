const fs = require('fs'); //Filesystem module for interacting with the file system
const path = require('path'); // Path module for handling file and directory paths

const basename = path.basename(__filename);
//generate name, handler pairs
module.exports = fs
    .readdirSync(__dirname)// Read the contents of the current directory synchronously
    .filter((file)=> file !== basename)// Filter out the current file
    .map((file)=>[path.basename(file, '.js'), require(`./${file}`)]);// Map each file to a name-handler pair