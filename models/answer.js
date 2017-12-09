var mongoose = require("mongoose");

var answerSchema = new mongoose.Schema({
    text:String,
    upvotes:{type: Number,default:0},
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        
        username:String
    },
    written: { type: Date, default: Date.now },
    
    comments:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Comment"
   }]
});

module.exports = mongoose.model("Answer",answerSchema);