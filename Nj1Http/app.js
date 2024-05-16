//Load http module
const http = require('http')


//Create server environment through http object
const server = http.createServer(function (request, response) {
         response.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF-8' })
         response.write("Hello nodeJs")//Write a string to the response object,
         response.end()//Inform the response object that the input is complete
}).listen(3000, () => console.log("server running"))