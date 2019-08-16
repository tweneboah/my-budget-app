const mongoose = require('mongoose');

const PassportLocalMongooseStrategy = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(PassportLocalMongooseStrategy);

module.exports = mongoose.model('User', userSchema);
