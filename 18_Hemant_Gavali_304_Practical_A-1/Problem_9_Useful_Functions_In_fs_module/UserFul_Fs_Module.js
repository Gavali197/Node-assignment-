const fs = require("fs");

// 1. Create File
fs.writeFile("demo.txt", "Hello Node.js", (err) => {
    if (err) throw err;
    console.log("File Created Successfully");

    // 2. Read File

    fs.readFile("demo.txt", "utf8", (err, data) => {
        if (err) throw err;
        console.log("File Read Data:", data);

        // 3. Append Data
        fs.appendFile("demo.txt", "\nWelcome to FS Module", (err) => {
            if (err) throw err;
            console.log("Data Added in File");

            // Read Updated File
            fs.readFile("demo.txt", "utf8", (err, data) => {
                if (err) throw err;
                console.log("Updated File Data:\n" + data);

                // 4. Rename File
                fs.rename("demo.txt", "sample.txt", (err) => {
                    if (err) throw err;
                    console.log("File Renamed Successfully");
                    console.log("Now File Name is: sample.txt");

                    // 5. Delete File
                    // fs.unlink("sample.txt", (err) => {
                    //     if (err) throw err;
                    //     console.log("File Deleted Successfully");
                    // });
                });
            });
        });
    });
});