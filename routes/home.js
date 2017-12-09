var express = require("express");
var Passport = require("passport");
var User = require("../models/user"),
   LocalStrategy = require("passport-local"),
    Answer = require("../models/answer"),
    Question = require("../models/question"),
    Topic    = require("../models/topic"),
    Comment = require("../models/comment"),
    router = express.Router();
    
    Passport.use(new LocalStrategy(User.authenticate()));
    Passport.serializeUser(User.serializeUser());
    Passport.deserializeUser(User.deserializeUser());
    
    router.get("/",function(req,res){
        if(req.user && req.user._id){
        var currentUserId = req.user._id;
        User.findById(currentUserId).populate({path:'topicsfollowed',model:'Topic',populate:{path:'questions',model:'Question'}})
        .populate({path:'topicsfollowed',model:'Topic',populate:{path:'questions.answer',model:'Answer'}}).populate({path:'following',model:'User',populate:{path:'answers.answer',model:'Answer'}})
        .populate({path:'following',model:'User',populate:{path:'answers.question',model:'Question'}})
        .populate({path:'following',model:'User',populate:{path:'answers.answer.comments',model:'Comment'}}).exec(function(err,foundUser)
        {   
            if(err){
                res.redirect("back");
            }else{
                res.render("wall",{user:foundUser});
            }
            
          });
        }
        else{
          res.redirect("login");
          }
    });
    
    router.get("/register",function(req,res){
      res.render("register");
    });
    
    router.post("/register",function(req,res){
       var newUser = new User({username:req.body.username});
       User.register(newUser,req.body.password,function(err,user){
         if(err){
           res.redirect("back");
         }else{
           Passport.authenticate("local")(req,res,function(){
             res.redirect("/");
           });
         }
       });
    });
    
    router.get("/login",function(req, res) {
        res.render("login");
    });
    
    router.post("/login",Passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"
    }),function(req,res){
    
  });
    
  module.exports = router;