const AdmZip = require('adm-zip')
const zip = new AdmZip("MyFolder.Zip")
zip.extractAllTo("ExtractedFolder", true)
console.log("ZIP File extracted SuccessFully.");
