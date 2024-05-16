//Load and introduce the url module. The url is specially used to process our address bar information.
const url = require('url')
//Simulate a string
let qs = '/?name=mary&age=20'
//Use the parse method of url to convert the object. This object is the object format of url. Instead of qs object format
let newStr = url.parse(qs)
//Show results
console.log(newStr);

