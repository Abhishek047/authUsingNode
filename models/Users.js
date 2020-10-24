const mongoose = require("mongoose");
const UserSchema = mongoose.Schema;

const User = new UserSchema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cratedAt:{
        type: Date,
        default: Date.now,
    }

});

module.exports = Users = mongoose.model("user", User);