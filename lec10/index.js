const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// app.listen(port, () => {
//     console.log("Server started on port " + port);
// });

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log("Server started on port " + port);
});



app.post('/submit', (req, res) => {
    const { username, password } = req.body;
    res.json({
        Username: username,
        Password: password,
    });
});