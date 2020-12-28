var ws = require("nodejs-websocket")

let count = 1
let conns = {}
var server = ws.createServer((conn) => {
    //接收到客户端数据
    conns[count]=conn
    count++
    conn.on('text', (e) => {
        let {toid,data}  = JSON.parse(e)
        let msg={
            data:data
        }
        conns[toid].send(JSON.stringify(msg))
    })
    conn.on('close', (data) => {
    })
    conn.on('error', (data) => {
        console.log("客户端连接异常")
    })
})

server.listen('3000', () => {
    console.log("启动websocket服务成功")
})

