const ans = {
    hello: "Hello",
    hii: "Hi",
    college: "VNSGU",
    course: "MSCICT",
    bye: "Good Day, Bye"
};

function reply(question) {

    question = question.toLowerCase();

    return ans[question] || "Sorry, I don't know.";

}

module.exports = reply;