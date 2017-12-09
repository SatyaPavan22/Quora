var express = require("express");
var mongoose = require("mongoose");
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
    
    function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    
    router.get("/",function(req,res){
        if(req.query.user&&req.xhr){
            const regex = new RegExp(escapeRegex(req.query.user), 'gi');
            User.find({username:regex},function(err,foundUsers){
               if(err){
                   console.log(err);
               } else{
                   res.status(200).json({foundUsers:foundUsers,currentUser:req.user});
               }
            });
        }else{
        User.find(function(err,allUsers){
           if(err){
               console.log(err);
           }else if(req.xhr){
               res.status(200).json({foundUsers:allUsers,currentUser:req.user});
               
           }
           else{
               res.render("user/users",{users:allUsers});
           }
        });
        }
    });
    
    router.post("/follow",function(req,res){
       User.findOne({username:req.body.userName},function(err,foundUser){
          if(err){
              console.log(err);
              res.status(500).json("Failure");
          } else{
              //console.log(req.user);
              //console.log(foundUser);
              foundUser.followers.push(req.user);
              foundUser.save();
              req.user.following.push(foundUser);
              req.user.save();
              res.status(200).json("Success");
          }
       });
    });
    
    router.get("/:id",function(req,res){
        if(req.xhr){
            console.log(req.params.id);
            User.findById(mongoose.Types.ObjectId(req.params.id)).populate("answers.answer").populate("answers.question").populate("topicsfollowed").populate("following").populate("followers").populate("questionsasked").exec(function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                    console.log(foundUser);
                     res.status(200).json({foundUser:foundUser,currentUser:req.user});
                }
        });
        }else{
        User.findById(req.params.id).populate("answers.answer").populate("answers.question").populate("topicsfollowed").populate("following").populate("followers").populate("questionsasked").exec(function(err,foundUser){
           if(err){
               console.log(err);
           }
           else{
              res.render("user/show",{user:foundUser});  
           }
        });
        }
/*    router.get("/:id/questions",function(req,res){
        
    });*/
       
    });
    
    module.exports = router;