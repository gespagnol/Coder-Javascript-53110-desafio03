const http=require("http")

const PORT=3000

const server=http.createServer((req, res)=>{   ///request // response

  
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"})
    res.end("server Básico con HTTP.....")
})

server.listen(PORT, ()=>{
 console.log("server online en puerto",PORT)

})