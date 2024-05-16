const routerHandler = require('./handle')

//routing object table
const routerList = {
    "/": routerHandler.root,

    "/student/insert": routerHandler.insert,
    "/student/update": routerHandler.update,
    "/student/delete": routerHandler.del,
    "/student/select": routerHandler.show,

    '/nofound': routerHandler.nofound
}

function router(path, req, res, data) {
    //The judgment operation of static files is omitted
    //.....

    let routerFun = routerList[path]
    if (!routerFun) routerFun = routerList['/nofound']
    routerFun(res, data)
}

exports.routerFun = router