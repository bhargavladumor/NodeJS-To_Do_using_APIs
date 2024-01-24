const passport = require("passport");
const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const Admin = require("../model/Admin");
const User = require("../model/User");

const admin_opts = {
    jwtFromRequest :jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'adminToken'
}

const user_opts = {
    jwtFromRequest :jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'userToken'
}

passport.use(new jwtStrategy(admin_opts , async function(record , done){
    let checkAdmin = await Admin.findById(record.admin._id);
    if(checkAdmin){
        return done(null,checkAdmin)
    }
    else{
        return done(null,false);
    }
}));

passport.use('userJWT',new jwtStrategy(user_opts , async function(record , done){
    let checkUser = await User.findById(record.user._id);
    if(checkUser){
        return done(null,checkUser)
    }
    else{
        return done(null,false);
    }
}));

passport.serializeUser(function(user,done){
    return done(null,user.id)
})

passport.deserializeUser(async function(id,done){
    let recheck = await Admin.findById(id);

    if(recheck){
        return done(null,recheck);
    }
    else{
        return done(null,false);
    }
})

module.exports = passport;