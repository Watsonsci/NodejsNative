const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer(onRequest).listen(3000)

function onRequest(req, res) {
    // text/plain means that plain text content is returned
    // res.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF-8' })
    // text/html returns the html content
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
    let urlPath = url.parse(req.url).pathname

    // router
    if (urlPath === '/') {
        //If the returned html page is called server rendering format
        //If the returned text is a plain text structure
        //If the returned json object is the server interface data, it becomes the server interface data.
        res.write(`<!DOCTYPE html>
         <html lang="en">
         <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Document</title>
            
             <style>
             a {
                 color: red;
                 text-decoration: none;
             }
         </style>
         </head>
         <body>
             <h1>Main page 123</h1>
         <div>
             <a href="/home">Personal page</a>&nbsp;<a href="/about">About page</a>
         </div>
         </body>
         </html>`)
    } else if (urlPath === "/home") {
        res.write(`<h1>Personal webpage</h1><a href="/">Main webpage</a>&nbsp;<a href="/about">About webpage</a>`)
    } else if (urlPath === "/about") {
        res.write(`<h1>About us</h1><a href="/">Main page</a>&nbsp;<a href="/home">Personal page</a>`)
    } else {
        res.write("<h1>Error: There is no such page</h1>")
    }
    res.end()
}