const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    adminId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    },
    taskIds : {
        type : Array,
        ref : "Task"
    } 
});

const User = mongoose.model("User",userSchema);

module.exports = User;