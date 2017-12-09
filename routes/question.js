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
    
    router.get("/new",function(req,res){
       res.render("question/new");
    });
    
    router.get("/",function(req,res){
        Question.find().populate("topic").exec(function(err,allQuestions){
           if(err){
               console.log(err);
           }
               else{
                   res.render("question/questions",{questions:allQuestions});
               }
          
        });
        
    });
        router.post("/upvote",function(req, res) {
        //console.log("Entered");
        //console.log(req.body.answerid);
        Answer.findById(mongoose.Types.ObjectId(req.body.answerid),function(err, foundAnswer) {
           if(err){
               console.log(err);
           }else{
               console.log("Found Answer "+foundAnswer);
               foundAnswer.upvotes++; 
               foundAnswer.save();
               console.log("Found Answer "+foundAnswer.upvotes);
               req.user.upvotedanswers.push(foundAnswer);
               req.user.save();
           }
            
        });
        
    });
    

    router.post("/",function(req,res){
        if(req.user && req.user._id){
        var currentUserId = req.user._id;
        User.findById(currentUserId,function(err,foundUser)
        {   
            if(err){
                console.log(err);
            }else{
        var newTopic = {name:req.body.topic};
    
        Topic.findOne({'name':req.body.topic},function(err,foundTopic){
           if(err){
               console.log(err);
           } else{
               if(foundTopic){
                 
                  Question.create(req.body.question,function(err,question){
                  if(err){
                      console.log(err);
                  }else{
                      question.author.id = foundUser._id;
                      question.author.username = foundUser.username;
                      question.topic.push(foundTopic);
                      question.save();
                      foundUser.questionsasked.push(question);
                    foundTopic.questions.push(question);
                      foundTopic.followers += 1;
                      foundTopic.save();
                      foundUser.topicsfollowed.push(foundTopic);
                      foundUser.save();
                      res.redirect("/questions");
                  }
                });
               }else{
                  Topic.create(newTopic,function(err,createdtopic){
                if(err){
                    console.log(err);
                }else{
                    createdtopic.save();
                }
                Question.create(req.body.question,function(err,question){
                  if(err){
                      console.log(err);
                  }else{
                      question.author.id = foundUser._id;
                      question.author.username = foundUser.username;
                     createdtopic.questions.push(question);
                      createdtopic.followers += 1;
                      createdtopic.save();
                      question.topic.push(createdtopic);
                      question.save();
                      foundUser.questionsasked.push(question);
                      foundUser.topicsfollowed.push(createdtopic);
                      foundUser.save();
                      res.redirect("/questions");
                    }
                  });
                });
                   
                }
                }
            });
            }
        });
        
        }
        else{
            res.redirect("login");
        }
    });
    
    router.get("/:id",function(req, res) {
        Question.findById(req.params.id).populate("answer").populate("topic").exec(function(err,foundQuestion){
           if(err){
               console.log(err);
           } else{
               res.render("question/show",{question:foundQuestion});
           }
        });
    });
    
    router.post("/:id",function(req,res){
            if(req.user && req.user._id){
        var currentUserId = req.user._id;
        User.findById(currentUserId,function(err,foundUser)
        {   
            console.log(foundUser);
            if(err){
                console.log(err);
            }else{
    Question.findById(req.params.id,function(err,foundQuestion){
           if(err){
               console.log(err);
           } else{
               var newAnswer = {text:req.body.answer};
               Answer.create(newAnswer,function(err,createdAnswer){
                  if(err){
                      console.log(err);
                  } else{
                      createdAnswer.author.username = req.user.username;
                      createdAnswer.author.id = req.user._id;
                      createdAnswer.save();
                      foundQuestion.answer.push(createdAnswer);
                      foundQuestion.save();
                      var answerComplete = {answer:createdAnswer,question:foundQuestion};
                      foundUser.answers.push(answerComplete);
                      foundUser.save();
                      //console.log("Found User "+foundQuestion);
                      //console.log("Question Modified "+foundQuestion);
                      res.redirect("/questions/"+foundQuestion._id);
                  }
               });
           }
        });
    }
    });
            }else{
                res.redirect("back");
            }
    });
    

    
 /*       function checkTopicAndCreate(topic){
        console.log("TOPIC "+topic);
        var newTopic = {name:topic};
         var createdTopic;
        Topic.create(newTopic,function(err,createdtopic){
            if(err){
                console.log(err);
            }else{
                createdtopic.save();
                //createdTopic = createdtopic;
                //return createdtopic;
            }
             
        });
        console.log("Created Topic Before "+createdTopic); 
        return createdTopic;
    }*/
     module.exports = router;
     
     