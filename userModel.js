const mongoose = require('mongoose');

let RegisterUser = new mongoose.Schema({
    userName : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    passWord : {
        type:String,
        required:true
    },
    conformPassword : {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('user',RegisterUser)