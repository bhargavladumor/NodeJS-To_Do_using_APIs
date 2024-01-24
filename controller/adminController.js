const Admin = require("../model/Admin");
const User = require("../model/User");
const Task = require("../model/Task");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Register
module.exports.register = async (req,res) => {
    try {
        
        if(req.body){
            let checkEmail = await Admin.findOne({email : req.body.email});
            if(!checkEmail){
                if(req.body.password == req.body.cmpass){
                    req.body.password = await bcrypt.hash(req.body.password,10);
                    let addData = await Admin.create(req.body);
                    if(addData){
                        return res.status(200).json({msg : "Admin inserted",data : addData,status : 1});
                    }
                    else{
                        return res.status(400).json({msg : "Data not inserted",status : 0});
                    }
                }
                else{
                    return res.status(400).json({msg : "Password does not matched",status : 0});
                }
            }
            else{
                return res.status(400).json({msg : "Email already exist",status : 0});
            }
        }
        else{
            return res.status(400).json({msg : "Data not found",status : 0});
        }

    } catch (error) {
        return res.status(400).json({msg : "Something wrong",status : 0});
    }
}

// Login
module.exports.login = async (req,res) => {
    try {
        
        if(req.body){
            let data = await Admin.findOne({email : req.body.email});
            if(data){
                if(await bcrypt.compare(req.body.password, data.password)){
                    let token = await jsonwebtoken.sign({admin : data}, 'adminToken');
                    if(token){
                        return res.status(200).json({msg : "Admin logged in",token : token,status : 1});
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
        return res.status(400).json({msg : "Something wrong",status : 0});
    }
}

// Login Fail
module.exports.loginFail = async (req,res) => {
    res.status(200).json({msg : "Login failed",satatus : 0});
}

// Add User
module.exports.addUser = async (req,res) => {
    try {
        
        if(req.body){
            let checkEmail = await User.findOne({email : req.body.email});
            if(!checkEmail){
                if(req.body.password == req.body.cmpass){

                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                          user: "bkladumor7@gmail.com",
                          pass: "ywdqcteljkeunfrq",
                        },
                      });
                      
                      const info = await transporter.sendMail({
                        from: 'bkladumor7@gmail.com', // sender address
                        to: req.body.email, // list of receivers
                        subject: "Password", // Subject line
                        text: "password : ", // plain text body
                        html: `<b>Your email : ${req.body.email}</b><br><b>Your Password : ${req.body.password}</b>`, // html body
                      });

                    req.body.password = await bcrypt.hash(req.body.password,10);
                    req.body.adminId = req.user.id;
                    let addData = await User.create(req.body);
                    if(addData){
                        let adminData = await Admin.findById(req.user.id);
                        if(adminData){

                            adminData.userIds.push(addData.id);
                            await Admin.findByIdAndUpdate(req.user.id,adminData);
                            
                            return res.status(200).json({msg : "User inserted",user : addData,status : 0});

                        }
                        return res.status(200).json({msg : "User inserted",data : addData,status : 1});
                    }
                    else{
                        return res.status(400).json({msg : "Data not inserted",status : 0});
                    }
                }
                else{
                    return res.status(400).json({msg : "Password does not matched",status : 0});
                }
            }
            else{
                return res.status(400).json({msg : "Email already exist",status : 0});
            }
        }
        else{
            return res.status(400).json({msg : "Data not found",status : 0});
        }

    } catch (error) {
        return res.status(400).json({msg : "Something wrong"+error,status : 0});
    }
}

// View All User
module.exports.viewAllUse = async (req,res) => {
    try {
        
        let adData = await Admin.findById(req.user.id).populate('userIds').exec();
        if(adData){
            return res.status(200).json({msg : "All Users",users : adData.userIds,status : 1});
        }
        else{
            return res.status(400).json({msg : "Data not found",status : 0});
        }

    } catch (error) {
        return res.status(400).json({msg : "Something wrong"+error,status : 0});
    }
}

// Add Task
module.exports.addTask = async (req,res) => {
    try {
        
        if(req.body){
            let addTask = await Task.create(req.body);
            if(addTask){
                let userData = await User.findById(req.body.userId);
                if(userData){
                    userData.taskIds.push(addTask.id);
                    await User.findByIdAndUpdate(req.body.userId,userData);

                    return res.status(200).json({msg : "Task inserted",task : addTask,status : 1});
                }
                else{
                    return res.status(400).json({msg : "User data not found",status : 0});
                }
            }
            else{
                return res.status(400).json({msg : "Data not found",status : 0});
            }
        }

    } catch (error) {
        return res.status(400).json({msg : "Something wrong"+error,status : 0});
    }
}