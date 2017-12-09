var mongoose = require("mongoose"),
    Answer = require("./models/answer"),
    Question = require("./models/question"),
    Topic    = require("./models/topic"),
    User     = require("./models/user"),
    Comment = require("./models/comment");
   
/*   var questionsData = [
              {
           title:"Have you ever met someone for the first time and got the strongest feeling that the person was bad?",
           description:"I was introduced to someone a few years ago. The first time I saw him, an overwhelmingly eerie feeling washed over me and made me feel like there was something black in his mind, something evil, something he didn't know how to control. There was nothing unusual about his appearance or demeanor."
       },
              {
           title:"Why are Telangana people asking for a separate Telangana state?",
           description:"What will they get from this separation? Is it really required?"
       },
              {
           title:"Do south Indians prefer English to Hindi when speaking with non-south Indians?",
           description:"I have heard this many a times. Is it true ? If it is, then the next obvious question is WHY."
       },
      ];*/
      
      function seedDb(){
  /*        Question.remove({},function(err){
              if(err){
                  console.log(err);
              }else{
                  console.log("Removed Questions");
                  questionsData.forEach(function(seed){
                 Question.create(seed,function(err,question){
                  if(err){
                      console.log(err);
                  }else{
                      question.save();
                  }
              }); 
                  });
              }
          });
          
          Topic.remove({},function(err){
             if(err){
                 console.log(err);
             } else{
                 console.log("Removed Topics");
             }
          });
          
        User.remove({},function(err){
             if(err){
                 console.log(err);
             } else{
                 console.log("Removed User");
             }
          });
          
          Answer.remove({},function(err) {
              if(err){
                  console.log(err);
              }else{
                  console.log("Removed answers");
              }
          });*/
        
      }
      
      module.exports = seedDb;