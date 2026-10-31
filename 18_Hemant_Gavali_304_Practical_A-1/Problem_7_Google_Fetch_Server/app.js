const http = require("http");

const server = http.createServer(async (req, res) => {

    if (req.url === "/google") {

        const response = await fetch("https://www.google.com");

            const data = await response.text();

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);

        } 

     else {

        res.writeHead(404);
        res.end("Hello , enter google in url ");

    }

});


server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});