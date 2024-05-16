//Load http module
const http = require('http')


//Create server environment through http object
const server = http.createServer(function (request, response) {
     //Accept the get request sent by the client
     let queryString = decodeURI(request.url);// /?name=tom
     let reqValueArr = getValueMutil(queryString)
     console.log(reqValueArr);
     // let name = "John Doe"
     // console.log(name);//John Doe
     // let newUrl = encodeURI(`http://www.baidu.com/s?search=${name}&key=hello world`)
     // console.log(newUrl);
     // console.log( decodeURI(newUrl));
     if (reqValueArr) {
         response.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF-8' })
         response.write("Hello node")//Write a string to the response object,
         // response.write(getValue(queryString))
         response.write(`Name:${reqValueArr[0]}, Age: ${reqValueArr[1]}`)
         response.end()//Inform the response object that the input is complete
     }
}).listen(3000, () => console.log("server running"))

function getValue(queryString) {
     //get value
     let queryStr = queryString.substring(2) // name=tom
     return queryStr.substring(queryStr.lastIndexOf('=') + 1) //Get the value through the native string api
}

//Multiple parameters
function getValueMutil(queryString) {
     if (queryString !== "/favicon.ico") {
         //username=mary&userage=20
         let queryStr = queryString.substring(2)
         let qsArray = queryStr.split("&")
         console.log(qsArray);
         let returnVal = qsArray.map(item => {
             return item.substring(item.lastIndexOf('=') + 1)
         })
         return returnVal
     }
}