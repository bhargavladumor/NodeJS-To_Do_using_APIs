const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");
const passport = require("passport");

// Login
routes.post("/login",userController.login);

// Login Fail
routes.get("/loginFail",userController.loginFail)

// View Tasks
routes.get("/viewTasks",passport.authenticate('userJWT',{failureRedirect : "/user/loginFail"}), userController.viewTasks);

// Task Activate
routes.get("/taskActive/:id",passport.authenticate('userJWT',{failureRedirect : "/user/loginFail"}),userController.taskActive);

// Task Completed
routes.get("/taskCompleted/:id",passport.authenticate('userJWT',{failureRedirect : "/user/loginFail"}),userController.taskCompleted);


module.exports = routes;