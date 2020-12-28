var ws = require("nodejs-websocket")

//记录连接数
let count = 0
let conns = {}
var server = ws.createServer((conn) => {
    count++
    conn.userName = `用户${count}`
    broadcast(`${conn.userName}进入了聊天室`)
    conns[count] = conn
    //接收到客户端数据
    conn.on('text', (data) => {
        console.log(data)
        broadcast(data)
    })
    conn.on('close', (data) => {
        count--
        broadcast(`${conn.userName}离开了聊天室`)
    })
    conn.on('error', (data) => {
        console.log("客户端连接异常")
    })
})

server.listen('3000', () => {
    console.log("启动websocket服务成功")
})

function broadcast(msg) {
    //给所有用户发送一条消息
    server.connections.forEach((item) => {
        item.send(msg)
    })

}