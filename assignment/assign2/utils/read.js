const fs = require("fs");

function read(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, "utf-8", function (err, data) {
            if (err) {
                // If file doesn't exist, return empty array
                if (err.code === 'ENOENT') {
                    return resolve([]);
                }
                return reject(err);
            }
            try {
                let users = JSON.parse(data || "[]");
                resolve(users);
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
}

module.exports = read;