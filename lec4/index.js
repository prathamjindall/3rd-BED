// function buyProduct(product_Name,cb){
//     //do some async function
//     setTimeout(() => {
//         //all the operations completed
//         console.log("all operations completed for product");
//         cb();
//     },0);
// }

// buyProduct("Iphone16", function(){
//     console.log("Product bought successfully");
// })

let product =[{
    name: "Samsung Galaxy S23",
    amount: 79999,
    quantity: 10,
},
{
    name: "Apple iPhone 14",
    amount: 99999,
    quantity: 5,
},
{
    name: "OnePlus 11",
    amount: 56999,
    quantity: 8,
},
{
    name: "Google Pixel 7",
    amount: 59999,
    quantity: 0,
}];
function buyProduct(product_Name,cb){
    //do some async function
    let isProduct = product.filter((p)=> p.name === product_Name)[0];
    if(!isProduct){
        return cb("Product not available",null);
    }
    cb(null,isProduct.amount);
    };




let availableAmount = 100000;
function deductAmount(amount,cb){
    if(availableAmount < amount){
        return cb("Insufficient balance",null);
    }
    else{
        availableAmount -= amount;
        cb(null,availableAmount);
    }

}

buyProduct("OnePlus 11", function(err,amount){
    if(err){
        return console.log(err);
    }
    console.log("amount is", amount);
    deductAmount(amount, function(err, availableAmount){
        if(err){
            return console.log(err);
        }
        console.log("Available amount after purchase is", availableAmount);
    });
})