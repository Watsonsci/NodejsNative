//Main entry file

//Load the imported server
const server = require('./server')

//Configuration item operation
global.port = 3001 //Set a global variable to modify the port


//Start the server
server.startServer()