const qs = require("querystring")
const http = require('http')
const url = require('url')


http.createServer(function (req, res) {
    //define query string
    const strurl = url.parse(req.url).query //Get a string without / and ? from the original string
    const query_json = qs.parse(strurl)//Able to convert strings into json objects
    console.log(query_json);
    //Display in default state = &
    //let query_str = qs.stringify(query_json)
    //console.log(decodeURI(query_str));
    //If you need to specify the form and it is a special symbol
    /**
      *Three parameters
      * Parameter 1: object
      * Parameter 2: key-value pair separator, equal to &
      * Parameter 3: key-value separator, equal to =
      */
    let query_str = qs.stringify(query_json, '^', '?')
    console.log(query_str);

}).listen(3002)