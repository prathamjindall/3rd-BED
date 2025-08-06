const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET: Fetch all users
app.get('/users', (req, res) => {
    fs.readFile('users.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Error reading users file");

        let allUsers = [];
        try {
            if (data && data.trim() !== "") {
                allUsers = JSON.parse(data);
            }
        } catch (parseErr) {
            return res.status(500).send("Error parsing JSON: " + parseErr.message);
        }

        res.json(allUsers);
    });
});

// POST: Add a new user
app.post('/adduser', (req, res) => {
    try {
        const { name, username } = req.body;

        if (!name || !username) {
            return res.status(400).send("Name and username are required");
        }

        const newUser = {
            id: Math.floor(Math.random() * 1000000),
            name: name,
            username: username,
            role: "user"
        };

        let allUsers = [];
        let data = "";

        // Read file if it exists
        if (fs.existsSync("./users.json")) {
            data = fs.readFileSync("./users.json", 'utf-8');
            if (data && data.trim() !== "") {
                allUsers = JSON.parse(data);
            }
        }

        allUsers.push(newUser);

        fs.writeFileSync("./users.json", JSON.stringify(allUsers, null, 2)); // pretty print
        res.send("User added successfully");
    } catch (error) {
        return res.status(500).send("Server error: " + error.message);
    }
});

app.listen(4400, () => {
    console.log('Server started on port 4400');
});
