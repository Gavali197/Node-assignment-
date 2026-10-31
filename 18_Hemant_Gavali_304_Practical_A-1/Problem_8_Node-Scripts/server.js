const { write } = require("fs");
const http=require("http");
http.createServer(function(req,res)
{
    res.writeHead(200,{"content-type":"text/html"});
    res.write('<h1>hello</h1>');
    res.end()
}).listen(3000,function()
{
      console.log("serevr running it http://localhost:3000");

})