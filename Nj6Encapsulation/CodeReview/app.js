//主入口文件
//加载引入服务器
const server = require('./server')
//配置项操作
global.port = 3001 //设置一个全局变量，可以对端口进行修改
//启动服务器
server.startServer()