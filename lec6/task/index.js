const fs = require("fs");
const path = require("path");

const file1 = path.join(__dirname, "../write/demo.txt");
const file2 = path.join(__dirname, "../write/demo2.txt");

fs.readFile(file1, "utf8", (err1, data1) => {
  if (err1) return console.log("error", err1);

  fs.readFile(file2, "utf8", (err2, data2) => {
    if (err2) return console.log("error", err2);

    const combined = data1 + "\n" + data2;
    console.log("Combined Content:\n");
    console.log(combined);
  });
});
