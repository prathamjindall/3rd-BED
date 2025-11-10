const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient()
async function addUser(email, name, password) {
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password
        }
    })
    return user
}
// addUser("pratham124434@gmail.com", "jindal", "1234")
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     })

async function addTweet(content, userId){
    await prisma.tweet.create({
        data: {
            content:content,
            userId:userId
        }
    })
}

// .then(()=> console.log("tweet is created"))


async function getUserTweets(userId){
    let tweets = await prisma.tweet.findMany({
        where:{
            userId:Number(userId)   
        }
    })
    return tweets;
}

getUserTweets("8")
.then((data)=>{
    console.log(data)
})


async function updateTweet(tweetId, userId, updatedContent) {
    let tweet = await prisma.tweet.findUnique({
        where: {
            id: Number(tweetId)
        }
    });
    if(!tweet) {
        return "Tweet not found";
    }
    if(tweet.userId!=Number(userId)){
        return "You are not authorized to update this tweet";
    }   
    await prisma.tweet.update({
        where: {
            id: Number(tweetId) 
        },
        data: {
            content: updatedContent
        }
    });
}

updateTweet("5","8","Updated tweet content")
.then((data)=>{
    console.log("tweet updated")
});


async function deleteUser(userId) {
    await prisma.user.delete({
        where: {
            id: Number(userId)
        }
    });
    return "user deleted"
}
deleteUser("1").
then((data)=>{
    console.log(data)
})
.catch(err=>console.log(err))
//     if(!tweet) {
//         return "Tweet not found";
//     }
//     if(tweet.userId!=Number(userId)){
//         return "You are not authorized to delete this tweet";
//     }
//     await prisma.tweet.delete({
//         where: {
//             id: Number(tweetId)
//         }
//     });
// }