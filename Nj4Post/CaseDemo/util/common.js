/**
  *
  * @param {jsonObject} needs to convert json object
  * @returns Returns the converted string form
  */
function jsonToStr(json){
   return JSON.stringify(json)
}

//Exposed
module.exports = {
   jsonToStr
}