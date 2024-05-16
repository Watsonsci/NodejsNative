const http = require('http')

http.createServer(onRequest).listen(3000)

function onRequest(req, res) {
    let student = {
        name: "tom",
        age: 25
    }
    //One of the ways to solve cross-domain access

    //If all websites can be accessed: Settings*
    //If only some websites can be accessed by running, directly write the website domain name port in the parameter position

    //If you need multiple domain names to support access, you can obtain the domain name through req.headers.origin, and complete the judgment of the domain name by loading it into the setHeader we need.
    if (require("./domain").domains.includes(req.headers.origin)) {
        //Which domain names are allowed to access this website?
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
        //Which request methods are allowed to access me?
        res.setHeader('Access-Control-Request-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
        //Allow access to information about which request bodies are carried
        res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type')
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    //The native output stream must be in string or buffer format
    res.write(JSON.stringify(student))
    res.end()
}