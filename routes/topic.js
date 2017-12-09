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
    
/*    router.post("/new",function(req,res){
       
       var newTopic = {name:req.body.topic};
       Topic.create(newTopic,function(err,createdTopic){
          if(err){
              console.log(err);
          } else{
              topic.render()
          }
       });
    });*/
    function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    
    router.get("/",function(req,res){;
        if(req.query.topic && req.xhr) {
      const regex = new RegExp(escapeRegex(req.query.topic), 'gi');
      Topic.find({name: regex}, function(err, allTopics){
         if(err){
            console.log(err);
         } else {
            res.status(200).json({topics: allTopics,currentUser:req.user});
         }
      });
  } else {
      // Get all topics from DB
      Topic.find({}, function(err, allTopics){
         if(err){
             console.log(err);
         } else {
            if(req.xhr) {
              res.json({topics: allTopics,currentUser:req.user});
            } else {
              res.render("topic/topic",{topics: allTopics});
            }
         }
      });
  } 
    });
    
    router.get("/:id",function(req,res){
       Topic.findById(mongoose.Types.ObjectId(req.params.id),function(err,foundTopic){
          if(err){
              console.log(err);
          } else{
              Question.find({topic:req.params.id}).populate("answer").exec(function(err,foundQuestions){
                 if(err){
                     console.log(err);
                 } else if(req.xhr){
                     res.status(200).json({topic:foundTopic,questions:foundQuestions});
                 }else{
                     res.render("topic/show",{topic:foundTopic,questions:foundQuestions});
                 }
              });
          }
       });
    });
        router.post("/follow",function(req,res){
            console.log(req.body.topicId);
       Topic.findById(mongoose.Types.ObjectId(req.body.topicId),function(err,foundTopic){
          if(err){
              console.log(err);
              res.status(500).json("Failure");
          } else{
              console.log("Entered");
              //console.log(foundUser);
              foundTopic.followers++;
              foundTopic.save();
              req.user.topicsfollowed.push(foundTopic);
              req.user.save();
              res.status(200).json("Success");
          }
       });
    });
    
    module.exports = router;