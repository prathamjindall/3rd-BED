//function to get comment data

console.log(axios);
function getComment(URL) {
    //how to send a GET request using axios
    axios.get(URL)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
        });
}

getComment('https://jsonplaceholder.typicode.com/comments');