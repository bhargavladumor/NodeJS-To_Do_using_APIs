const express = require("express");
const routes = express.Router();
const adminController = require("../controller/adminController");
const passport = require("passport");

// Register
routes.post("/register",adminController.register);

// Login
routes.post("/login",adminController.login);

// Login Fail
routes.get("/loginFail",adminController.loginFail)

// Add User
routes.post("/addUser",passport.authenticate('jwt',{failureRedirect : "/admin/loginFail"}),adminController.addUser);

// All Users
routes.get("/viewAllUser",passport.authenticate('jwt',{failureRedirect : "/admin/loginFail"}),adminController.viewAllUse);

// Task
routes.post("/addTask",passport.authenticate('jwt',{failureRedirect : "/admin/loginFail"}),adminController.addTask);

module.exports = routes;