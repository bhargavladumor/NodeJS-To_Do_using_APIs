const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/API2");

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err) console.log("Not connected to DB");
    console.log("MongoDB connected.");
})

module.exports = db;