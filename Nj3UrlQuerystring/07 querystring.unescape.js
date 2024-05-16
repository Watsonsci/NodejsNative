const qs = require("querystring")

let str = "I like querystring query string"
let encode= qs.escape(str)
encode = qs.unescape(encode)
console.log(encode);