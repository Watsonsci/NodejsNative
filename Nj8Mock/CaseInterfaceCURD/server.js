let students = [
    {
        studentID: '100',
        studentName: 'David',
        studentAge: '25',
        studentGender: 'Male'
    },
    {
        studentID: '101',
        studentName: 'Calvin',
        studentAge: '21',
        studentGender: 'Male'
    },
    {
        studentID: '102',
        studentName: 'Henry',
        studentAge: '24',
        studentGender: 'Male'
    },
    {
        studentID: '103',
        studentName: 'Helen',
        studentAge: '23',
        studentGender: 'female'
    },
]

Mock.mock("http://www.xxx.com/students/update", "post", function (res) {
    //Get value
    let updataStudent = qs2Json(decodeURIComponent(res.body))
    students = students.map(item => {
        if (item.studentID == updataStudent.studentID) {
            return updateStudent
        }
        return item
    })
    return {
        code: 200,
        msg: "Operation successful",
        data: []
    }

})


Mock.mock(new RegExp("http://www.xxx.com/student/findOne*"), "get", function (res) {
    let resJson = qs2Json(res.url.substring(res.url.lastIndexOf('?') + 1));
    let udpateStudent = students.find(item => item.studentID == resJson.id)
    return {
        code: 200,
        msg: "Operation successful",
        data: [udpateStudent]
    }
})

Mock.mock("http://www.xxx.com/students/del", "post", function (res) {
    let resJson = qs2Json(res.body)
    students = students.filter(item => !(item.studentID == resJson.itemID))
    return {
        code: 200,
        msg: "Operation successful",
        data: []
    }
})

Mock.mock("http://www.xxx.com/students/list", "get", function () {
    return {
        code: 200,
        msg: "Operation successful",
        data: students
    }
})

Mock.mock("http://www.xxx.com/students/add", "post", function (res) {
    let resBody = qs2Json(decodeURIComponent(res.body))
    if (students.some(item => item.studentID == resBody.studentID)) {
        return {
            code: 100,
            msg: "Add failed! Student number already exists",
            data: []
        }
    }
    //Put into the current array
    students.push(resBody)
    return {
        code: 200,
        msg: "Operation successful",
        data: students
    }
})

function qs2Json(str) {
    return (str.match(/([^=&]+)(=([^&]*))/g) || []).reduce((a, val) => ((a[val.slice(0, val.indexOf('='))] = val.slice(val.indexOf('=') + 1)), a), {})
}