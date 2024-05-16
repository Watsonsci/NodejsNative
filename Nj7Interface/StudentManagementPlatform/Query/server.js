const http = require('http')
const url = require('url')
const router = require('./router/index')

function startServer() {
    http.createServer(onRequest).listen(global.port)
    function onRequest(req, res) {
        //Get urlPath
        const urlPath = url.parse(req.url).pathname
        //accept data
        let postData = ""
        req.on('data', (postValue) => {
            postData += postValue
        }).on('end', () => {
            if (req.method == 'GET') {
                postData = url.parse(req.url).query
            }
            //Access route
            router.routerFun(urlPath, req, res, postData)
        })
    }
}

exports.startServer = startServer