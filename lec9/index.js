const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello");
});

app.post('/send', (req, res) => {
    const { username, password } = req.body;

    const userData = { username, password };

    fs.writeFile("user.txt", JSON.stringify(userData), (err) => {
        if (err) {
            console.error("Error writing file:", err);
            res.status(500).json({ error: "Failed to save data" });
        } else {
            console.log("Data saved successfully to");
            res.json({
                message: "User data saved",
                Username: username,
                Password: password
            });
        }
    });
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});