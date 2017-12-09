var express = require("express");
var Passport = require("passport");
var mongoose = require("mongoose");
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
    
    router.post("/:id",function(req, res) {
        Answer.findById(mongoose.Types.ObjectId(req.params.id),function(err, foundAnswer) {
           if(err){
               console.log(err);
           }else{
               var newComment = {text:req.body.commentText};
                Comment.create(newComment,function(err, createdComment) {
                    if(err){
                        console.log(err);
                    }else{
                        createdComment.author.id = req.user._id;
                        createdComment.author.username = req.user.username;
                        createdComment.save();
                        foundAnswer.comments.push(createdComment);
                        foundAnswer.save();
                        console.log(foundAnswer);
                         res.status(200).json({createdComment:createdComment});
                    }
                });
           }
            
        });
        
    });
    
    router.get("/:id",function(req,res){
        Answer.findById(mongoose.Types.ObjectId(req.params.id)).populate("comments").exec(function(err, foundAnswer){
           if(err){
               console.log(err);
           } else{
            res.status(200).json({comments:foundAnswer.comments})   
           }
        });
    });
    module.exports = router;