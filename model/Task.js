const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
});

const Task = mongoose.model("Task",taskSchema);

module.exports = Task;