const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    let file = "./public";

    if (req.url == "/")
        file += "/index.html";
    else
        file += req.url;

    fs.readFile(file, (err, data) => {

        if (err) {
            res.writeHead(404);
            res.end("File Not Found");
            return;
        }

        res.end(data);

    });

});

server.listen(5000, () => {
    console.log("http://localhost:5000");
    
});