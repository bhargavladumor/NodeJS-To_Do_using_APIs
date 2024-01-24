const User = require("../model/User");
const Admin = require("../model/Admin");
const Task = require("../model/Task");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

// Login
module.exports.login = async (req,res) => {
    try {
        
        if(req.body){
            let data = await User.findOne({email : req.body.email});
            if(data){
                if(await bcrypt.compare(req.body.password, data.password)){
                    let token = await jsonwebtoken.sign({user : data}, 'userToken');
                    if(token){
                        return res.status(200).json({msg : "User logged in",token : token,status : 1});
                    }
                    else{
                        return res.status(400).json({msg : "Token not generated",status : 0});
                    }
                }
                else{
                    return res.status(400).json({msg : "Wrong password",status : 0});
                }
            }   
            else{
                return res.status(400).json({msg : "Data not found",status : 0});
            } 
        }
        else{
            return res.status(400).json({msg : "Data not found",status : 0});
        }

    } catch (error) {
        return res.status(400).json({msg : "Something wrong"+error,status : 0});
    }
}

// Login Fail
module.exports.loginFail = async (req,res) => {
    res.status(200).json({msg : "Login failed",satatus : 0});
}

// View Tasks
module.exports.viewTasks = async (req,res) => {
    try {
        
        let allTasks = await User.findById(req.user.id).populate("taskIds").exec();
        if(allTasks){
            return res.status(200).json({msg : "All Tasks",allTasks : allTasks.taskIds,status : 0});
        }
        else{
            return res.status(400).json({msg : "Data not found",status : 0});
        }

    } catch (error) {
        return res.status(400).json({msg : "Something wrong"+error,status : 0});
    }
}

// Task Active
module.exports.taskActive = async (req,res) => {
    try {
        
        if(req.params.id){
            let activeTask = await Task.findByIdAndUpdate(req.params.id,{status : 'active'})
            if(activeTask){
                return res.status(200).json({msg : "Task Activated",status : 1});
            }
            else{
                return res.status(400).json({msg : "Data not found",status : 0});
            }
        }

    } catch (error) {
        return res.status(400).json({msg : "Something wrong"+error,status : 0});
    }
}

// Task Completed
module.exports.taskCompleted = async (req,res) => {
    try {
        
        if(req.params.id){
            let cmTask = await Task.findByIdAndUpdate(req.params.id,{status : 'completed'})
            if(cmTask){
                return res.status(200).json({msg : "Task Completed",status : 1});
            }
            else{
                return res.status(400).json({msg : "Data not found",status : 0});
            }
        }

    } catch (error) {
        return res.status(400).json({msg : "Something wrong"+error,status : 0});
    }
}