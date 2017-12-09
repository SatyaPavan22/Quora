var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
   username:String,
   about:String,
   password:String,
   
   following:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
   }],
   followers:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
   }],
   questionsasked:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Question"
   }],
   comments:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Comment"
   },
   topicsfollowed:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Topic"
   }],
   upvotedanswers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Answer"
   }],
   answers:[{
      answer:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Answer"
   },
      question:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Question"
      }
   }]
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);