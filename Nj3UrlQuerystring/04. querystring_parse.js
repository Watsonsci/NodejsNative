const qs = require("querystring")
const http = require('http')
const url = require('url')


http.createServer(function (req, res) {
    //define query string
    const strurl = url.parse(req.url).query //Get a string without / and ? from the original string
    const query_json = qs.parse(strurl)//Able to convert strings into json objects
    console.log(query_json);

}).listen(3002)