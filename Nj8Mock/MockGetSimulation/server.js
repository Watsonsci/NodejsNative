//Simulate data
let arr = [
    {
        "linkId": "1",
        " ": "sina",
        "url": "http://www.sina.com.cn"
    },
    {
        "linkId": "2",
        "sitename": "baidu",
        "url": "http://www.baidu.com"
    }
]

//Parameter 1: Indicates the URL that needs to be intercepted, that is, the address of ajax-url
//Parameter 2: The type to be used in the request, get, post
//Parameter three: The callback function that is executed after all requests meet the requirements. The return object can be completed in this function.
Mock.mock("http://www.xxx.com/link/list", "get", function () {
    return {
        code: 200,
        msg: "Operation successful",
        data: arr
    }
})