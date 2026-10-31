const fs = require("fs");

// Promisify fs.unlink function
function deleteFile(fileName) {
    return new Promise((resolve, reject) => {

        fs.unlink(fileName, (err) => {

            if (err) {
                reject(err);
            } else {
                resolve("File Deleted Successfully");
            }

        });

    });
}

// Call Promise function
deleteFile("demo.txt")
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log("file is not found");
    });