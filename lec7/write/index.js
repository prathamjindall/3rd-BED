let users = [
    {
        name :"Pratham",
        age : "20",
        address : "chd"
    },

    {
        name :"jindal",
        age : "19",
        address : "Raajapur"

    }
]

const fs = require("fs");
fs.writeFile("../write/users.txt/",JSON.stringify(users),function(err){
    if(err) return console.log(err);
    console.log("users written!");
})
