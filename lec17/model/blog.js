
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BlogPost = new schema({
    title: String,
    body: String,
    date: Date
});

module.exports = mongoose.model('Blog', BlogPost);



