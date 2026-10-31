const readline = require("readline");
const chatbot = require("./chatbot");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ask me: ", (qu) => {
    console.log(chatbot(qu));
    rl.close();
});