const express = require('express');
const app = express();
const fs = require("fs")

app.use(express.static(__dirname+ "/public"))

app.get('/user',(req,res) => {
    fs.readFile("./user.json","utf-8",function(err,data){
        if(err)res.send(err);
        let allusers=JSON.parse(data);
        res.json(allusers);
    });
})



app.listen(3000,function(){
    console.log('Server started on port 3000')
});
