
const {mongoose_connection_link} = require('./helper');

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://jahnvichaurasia481:2kjNAChDbp0MVSLE@cluster0.jlgjffa.mongodb.net/Webtoons2");
//also add the name of the database to the connection string 

const UserSchema =  new mongoose.Schema({
    username: String,
    password: String 

});

const WebtoonSchema = new mongoose.Schema({
    title:String,
    description:String,
    character:String
});

const User = mongoose.model('User',UserSchema);
const Webtoon = mongoose.model('Webtoon',WebtoonSchema);

module.exports={
    User,
    Webtoon
};


