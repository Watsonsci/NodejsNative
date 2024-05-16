//Simulate data
let arr = [
    {
       "linkId":"1",
       "sitename":"sina",
       "url":"http://www.sina.com.cn"
    },
    {
        "linkId":"2",
        "sitename":"baidu",
        "url":"http://www.baidu.com"
    }
]

//Parameter 1: Indicates the URL that needs to be intercepted, that is, the address of ajax-url. Note that the first parameter of mock can also be a regular expression object.
//Parameter 2: The type to be used in the request, get, post
//Parameter three: The callback function that is executed after all requests meet the requirements. The return object can be completed in this function.
Mock.mock(new RegExp("http://www.xxx.com/link/list*") ,"get",function(res){
     let jsonObj = qs2Json(res.url.substring(res.url.lastIndexOf('?')+1))
     console.log(jsonObj);
    return {
        code:200,
        msg:"Operation successful",
        data:arr
    }
})

Mock.mock("http://www.xxx.com/link/update","post",function(res){
//Post data can be accepted as data directly by function parameters.
    console.log(qs2Json(decodeURIComponent(res.body)));
    // arr.push()
    return {
        code:200,
        msg:"Operation successful",
        data:arr
    }
})

function qs2Json(str) {
    return (str.match(/([^=&]+)(=([^&]*))/g) || []).reduce((a, val) => ((a[val.slice (0, val.indexOf('='))] = val.slice(val.indexOf('=') + 1)), a), {})
}