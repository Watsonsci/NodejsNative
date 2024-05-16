const students = require('../data/students')



function root(res, data) { }
function insert(res, data) { }
function update(res, data) { }
function del(res, data) { }
function show(res, data) {
    console.log(students);

}
function onfound(res, data) { }
//Interface rendering 
function rander(jsonObj, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.write(JSON.stringify(jsonObj))
    res.end()
}


module.exports = {
    root, insert, update, del, show, onfound
}