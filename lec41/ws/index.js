const {WebSocketServer}=require("ws")

const ws=new WebSocketServer({port:8080});



wss.on("connection",(socket)=>{

    console.log("user connected")

})