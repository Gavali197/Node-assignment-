const fs = require('fs')
const archiver = require('archiver')
const output = fs.createWriteStream("MyFolder.zip")
const archive = archiver("zip")
archive.pipe(output)
archive.directory("MyFolder/", false)
archive.finalize();
console.log("ZIP file Created SuccessFully.");
