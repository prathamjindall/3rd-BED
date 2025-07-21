const fs = require("fs");

function write(filepath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(data, null, 2), function (err) {
            if (err) return reject(err);
            resolve("File written successfully!");
        });
    });
}

module.exports = write;