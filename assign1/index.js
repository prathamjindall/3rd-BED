const fs = require("fs");
const input = process.argv.slice(2).join(" ");

fs.writeFile("../assign1/demo-assign.txt", input, function(err) {
    if(err) return console.log(err);
    console.log("File written successfully!");
});