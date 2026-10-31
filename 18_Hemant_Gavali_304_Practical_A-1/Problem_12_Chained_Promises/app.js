const fs = require("fs");


function createFile() {
    return new Promise((resolve, reject) => {

        fs.writeFile("demo.txjhht", "", (err) => {
            if (err)
                reject(err);
            else
                resolve("File Created");
        });

    });
}



function writeData() {
    return new Promise((resolve, reject) => {

        fs.writeFile("demo.txt", "Hello Node.js Promise", (err) => {
            if (err)
                reject(err);
            else
                resolve("Data Written");
        });

    });
}



function readData() {
    return new Promise((resolve, reject) => {

        fs.readFile("demo.txt", "utf8", (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });

    });
}



createFile()
    .then((result) => {
        console.log(result);
        return writeData();
    })
    .then((result) => {
        console.log(result);
        return readData();
    })
    .then((data) => {
        console.log("File Data:", data);
    })
    .catch((err) => {
        console.log(err);
    });