const fs = require("fs");

fs.writeFile("demo.txt", "hello nigga", function (err) {
  if (err) return console.log(err);
  console.log("success");
});

fs.writeFile("demo2.txt", "hello nigga once again", function (err) {
  if (err) return console.log(err);
});


