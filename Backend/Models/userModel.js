const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname : {type: String, required: true},
    email : { type: String, required : true },
    username : { type: String, required: true},
    passwordHash : {type:String, required : true}
});

const User = mongoose.model("user",userSchema);

module.exports = User;