const students = require('../data/students')
const qs = require('querystring')

function root(res, data) { }
function insert(res, data) {
    let newData = qs.parse(data);
    students.push = newData
    rander({}, res)
}
function update(res, data) { }
function del(res, data) { }
function show(res, data) {
    rander(students, res)
}
function onfound(res, data) { }
//Interface rendering return
function rander(jsonObj, res) {
    jsonObj = {
        code: 200,
        msg: "Operation successful",
        data: jsonObj
    }
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.write(JSON.stringify(jsonObj))
    res.end()
}


module.exports = {
    root, insert, update, del, show, onfound
}